import { cache } from 'react';
import type { SupabaseClient } from '@supabase/supabase-js';

import { Database } from '@/database.types';
import Subscription from '../stripe/subscription';
import getSupabaseServerClient from '../supabase/server-component-client';

type Client = SupabaseClient<Database>;

export const getSubscription = cache(async () => {
  const client = getSupabaseServerClient();
  const sessionResponse = await client.auth.getSession();

  if (sessionResponse.error) {
    throw sessionResponse.error;
  }

  const userId = sessionResponse.data.session?.user.id;

  if (!userId) {
    throw new Error('User not found');
  }

  const { error, data } = await getUserSubscription(client, userId);

  if (error) {
    throw error;
  }

  return data;
});

async function getUserSubscription(client: Client, userId: string) {
  return client
    .from('customers_subscriptions')
    .select<
      string,
      {
        customerId: string;
        subscription: Subscription | undefined;
      }
    >(
      `
        customerId: customer_id,
        subscription: subscription_id (
          id,
          status,
          currency,
          interval,
          cancelAtPeriodEnd: cancel_at_period_end,
          intervalCount: interval_count,
          priceId: price_id,
          createdAt: created_at,
          periodStartsAt: period_starts_at,
          periodEndsAt: period_ends_at,
          trialStartsAt: trial_starts_at,
          trialEndsAt: trial_ends_at
        )
      `,
    )
    .eq('user_id', userId)
    .throwOnError()
    .maybeSingle();
}

export async function getOrganizationSubscriptionActive(
  client: Client,
  userId: string,
) {
  const { data } = await getUserSubscription(client, userId);

  const status = data?.subscription?.status;

  if (!status) {
    return false;
  }

  return status === 'active' || status === 'trialing';
}
