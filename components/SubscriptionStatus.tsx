import { useMemo } from 'react';

import plans from '../lib/stripe/plans';
import Subscription from '../lib/stripe/subscription';

function SubscriptionStatus(
  {
    subscription,
  }: React.PropsWithChildren<{
    subscription: Subscription;
  }>
) {
  const plan = useMemo(() => {
    return plans.find((plan) => {
      return plan.prices.some(price => price.id === subscription.priceId);
    })
  }, [subscription.priceId]);

  const dates = useMemo(() => {
    return {
      endDate: new Date(subscription.periodEndsAt).toDateString(),
      trialEndDate: subscription.trialEndsAt
        ? new Date(subscription.trialEndsAt).toDateString()
        : null,
    };
  }, [subscription]);

  if (!plan) {
    return null;
  }

  const cancelAtPeriodEnd = subscription.cancelAtPeriodEnd;

  return (
    <div>
      <h1>
        You are subscribed to the plan: <b>{plan.name}</b>
      </h1>

      <div>
        The current status of your subscription is <b>{subscription.status}</b>
      </div>

      <div>
        <RenewStatusDescription cancelAtPeriodEnd={cancelAtPeriodEnd} dates={dates} />
      </div>
    </div>
  );
}

function RenewStatusDescription(
  props: React.PropsWithChildren<{
    cancelAtPeriodEnd: boolean;
    dates: {
      endDate: string;
      trialEndDate: string | null;
    };
  }>
) {
  if (props.cancelAtPeriodEnd) {
    return (
      <span>
        Your subscription is scheduled to be canceled on {props.dates.endDate}
      </span>
    );
  }

  return (
    <span>
      Your subscription is scheduled to be renewed on {props.dates.endDate}
    </span>
  );
}

export default SubscriptionStatus;