'use server';

import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { RedirectType } from 'next/dist/client/components/redirect';

import createStripeCheckout from '../stripe/checkout';
import plans from '../stripe/plans';
import createBillingPortalSession from '../stripe/billing-portal';
import getSupabaseServerActionClient from '@/lib/supabase/action-client';

export async function createCheckoutAction(formData: FormData) {
  const priceId = formData.get('priceId') as string;
  const returnUrl = headers().get('referer') || headers().get('origin') || '';

  if (!priceId) {
    throw new Error(`Price ID was not provided`);
  }

  const redirectToErrorPage = (error?: string) => {
    console.error({ error }, `Could not create Stripe Checkout session`);

    const url = [returnUrl, `?error=true`].join('');

    return redirect(url);
  };

  const client = getSupabaseServerActionClient();

  // require the user to be logged in
  const userResult = await client.auth.getSession();
  const userId = userResult.data?.session?.user.id;

  if (!userId) {
    redirect('/auth/sign-in');
  }

  const { customerId, subscriptionId } = await client
    .from('customers_subscriptions')
    .select('customer_id, subscription_id')
    .eq('user_id', userId)
    .throwOnError()
    .maybeSingle()
    .then(({ data, error }) => {
      if (error) {
        throw error;
      }

      return {
        customerId: data?.customer_id,
        subscriptionId: data?.subscription_id,
      };
    });

  // if the user already has a subscription, redirect them to the dashboard
  if (subscriptionId) {
    return redirectToErrorPage(`User already has a subscription`);
  }

  const trialPeriodDays = getTrialPeriodDays(priceId);

  // create the Stripe Checkout session
  const { url } = await createStripeCheckout({
    returnUrl,
    userId,
    priceId,
    customerId,
    trialPeriodDays,
  }).catch((e) => {
    console.error(e, `Stripe Checkout error`);

    return redirectToErrorPage(`An unexpected error occurred`);
  });

  console.log({ url }, `Stripe Checkout session created`);

  if (!url) {
    return redirectToErrorPage(`An unexpected error occurred`);
  }

  // redirect user back based on the response
  return redirect(url, RedirectType.replace);
}

export async function createBillingPortalSessionAction(formData: FormData) {
  const customerId = formData.get('customerId') as string;

  if (!customerId) {
    throw new Error(`Customer ID was not provided`);
  }

  const client = getSupabaseServerActionClient();
  const session = await client.auth.getSession();

  if (session.error || !session.data?.session?.user?.id) {
    throw new Error(`User is not logged in`);
  }

  const referer = headers().get('referer');
  const origin = headers().get('origin');
  const returnUrl = referer || origin;

  if (!returnUrl) {
    throw new Error(`Referer or origin was not provided`);
  }

  // get the Stripe Billing Portal session
  const { url } = await createBillingPortalSession({
    returnUrl,
    customerId,
  });

  // redirect to the Stripe Billing Portal
  return redirect(url, RedirectType.replace);
}

function getTrialPeriodDays(priceId: string) {
  for (const plan of plans) {
    for (const price of plan.prices) {
      if (price.id === priceId) {
        return plan.trialPeriodDays;
      }
    }
  }
}
