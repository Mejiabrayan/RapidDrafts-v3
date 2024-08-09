import type { Stripe } from 'stripe';
import type { SupabaseClient } from '@supabase/supabase-js';

import { headers } from 'next/headers';
import { NextResponse } from 'next/server';

import getStripeInstance from '@/lib/stripe/client';

import {
  addSubscription,
  deleteSubscription,
  setCustomerSubscriptionData,
  updateSubscriptionById,
} from '@/lib/mutations/subscription';

import { updateUserTokens } from '@/lib/mutations/thresholds';
import plans from '@/lib/stripe/plans';
import getSupabaseServerActionClient from '@/lib/supabase/action-client';

const STRIPE_SIGNATURE_HEADER = 'stripe-signature';

enum StripeWebhooks {
  Completed = 'checkout.session.completed',
  SubscriptionDeleted = 'customer.subscription.deleted',
  SubscriptionUpdated = 'customer.subscription.updated',
  InvoicePaid = 'invoice.payment_succeeded',
}

const webhookSecretKey = process.env.STRIPE_WEBHOOK_SECRET as string;

export async function POST(request: Request) {
  const signature = headers().get(STRIPE_SIGNATURE_HEADER);

  console.info(`[Stripe] Received Stripe Webhook`);

  if (!webhookSecretKey) {
    return new Response(
      `The variable STRIPE_WEBHOOK_SECRET is unset. Please add the STRIPE_WEBHOOK_SECRET environment variable`,
      {
        status: 400,
      },
    );
  }

  // verify signature header is not missing
  if (!signature) {
    return new Response(null, { status: 400 });
  }

  const rawBody = await request.text();
  const stripe = await getStripeInstance();

  // create an Admin client to write to the subscriptions table
  const client = getSupabaseServerActionClient({
    admin: true,
  });

  try {
    // build the event from the raw body and signature using Stripe
    const event = await stripe.webhooks.constructEventAsync(
      rawBody,
      signature,
      webhookSecretKey,
    );

    console.info(
      {
        type: event.type,
      },
      `[Stripe] Processing Stripe Webhook...`,
    );

    switch (event.type) {
      case StripeWebhooks.Completed: {
        const session = event.data.object as Stripe.Checkout.Session;
        const subscriptionId = session.subscription as string;

        const subscription =
          await stripe.subscriptions.retrieve(subscriptionId);

        await onCheckoutCompleted(client, session, subscription);

        break;
      }

      case StripeWebhooks.SubscriptionDeleted: {
        const subscription = event.data.object as Stripe.Subscription;

        await deleteSubscription(client, subscription.id);

        break;
      }

      case StripeWebhooks.SubscriptionUpdated: {
        const subscription = event.data.object as Stripe.Subscription;

        await updateSubscriptionById(client, subscription);

        break;
      }

      case StripeWebhooks.InvoicePaid: {
        const invoice = event.data.object as Stripe.Invoice;
        const customerId = invoice.customer as string;

        const user = await client
          .from('customers_subscriptions')
          .select('user_id')
          .eq('customer_id', customerId)
          .single();

        const userId = user.data?.user_id;

        // if the user is not found, we return a 200
        // so Stripe does not retry the webhook
        if (!userId) {
          return NextResponse.json({ success: true });
        }

        const stripePriceId = invoice.lines.data[0]?.price?.id;

        if (!stripePriceId) {
          return Promise.reject(`Price not found for invoice ${invoice.id}`);
        }

        const tokens = getTokensByPriceId(stripePriceId);

        await updateUserTokens(client, userId, tokens);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(
      {
        error,
      },
      `[Stripe] Webhook handling failed`,
    );

    return new Response(null, { status: 500 });
  }
}

async function onCheckoutCompleted(
  client: SupabaseClient,
  session: Stripe.Checkout.Session,
  subscription: Stripe.Subscription,
) {
  const userId = getUserIdFromClientReference(session);
  const customerId = session.customer as string;
  const { error, data } = await addSubscription(client, subscription, userId);

  if (error) {
    return Promise.reject(
      `Failed to add subscription to the database: ${error}`,
    );
  }

  // finally, we set the subscription data on
  // the user subscriptions join table
  return setCustomerSubscriptionData(client, {
    customerId,
    userId,
    subscriptionId: data.id,
  });
}

function getUserIdFromClientReference(session: Stripe.Checkout.Session) {
  return session.client_reference_id as string;
}

function getTokensByPriceId(stripePriceId: string) {
  for (const plan of plans) {
    for (const price of plan.prices) {
      if (price.id === stripePriceId) {
        return price.tokens;
      }
    }
  }

  throw new Error(`Price not found for price ID ${stripePriceId}`);
}
