import { use } from 'react';

import { CreditCardIcon } from 'lucide-react';
import PricingTable from '@/components/PricingTable';
import { getSubscription } from '@/lib/queries/subscription';
import SubscriptionStatus from '@/components/SubscriptionStatus';
import BillingPortalButton from '@/components/BillingPortalButton';

function SubscriptionPage() {
  const data = use(getSubscription());
  const subscription = data?.subscription;
  const customerId = data?.customerId;

  return (
    <div className='container'>
      <div className='flex flex-col flex-1 space-y-8'>
        <h1 className='text-2xl font-semibold flex space-x-4 items-center'>
          <CreditCardIcon className='w-5 h-5' />

          <span>
            Subscription
          </span>
        </h1>

        {
          subscription ? <SubscriptionStatus subscription={subscription} /> : <PricingTable />
        }

        {
          customerId ? <BillingPortalButton customerId={customerId} /> : null
        }
      </div>
    </div>
  );
}

export default SubscriptionPage;