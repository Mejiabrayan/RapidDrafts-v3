import { Button } from './ui/button';
import { createBillingPortalSessionAction } from '../lib/actions/subscription';

function BillingPortalButton(
  { customerId }: React.PropsWithChildren<{
    customerId: string;
  }>
) {
  return (
    <form action={createBillingPortalSessionAction}>
      <input type={'hidden'} name={'customerId'} value={customerId} />

      <Button variant='outline'>
        Go to Billing Portal
      </Button>
    </form>
  );
};

export default BillingPortalButton;