'use client';

import { CheckCircleIcon } from 'lucide-react';
import { useState } from 'react';

import plans from '../lib/stripe/plans';
import { Button } from './ui/button';
import { createCheckoutAction } from '@/lib/actions/subscription';

function PricingTable() {
  const [selectedCycle, setSelectedCycle] = useState<'monthly' | 'yearly'>(
    'monthly',
  );

  const getVariant = (cycle: 'monthly' | 'yearly') => {
    if (cycle === selectedCycle) {
      return 'default';
    }

    return 'ghost';
  };

  return (
    <div className="flex flex-col space-y-8 items-center">
      <div className="flex justify-center">
        <div className="flex space-x-1">
          <Button
            type="button"
            onClick={() => setSelectedCycle('monthly')}
            variant={getVariant('monthly')}
          >
            Monthly
          </Button>

          <Button
            type="button"
            onClick={() => setSelectedCycle('yearly')}
            variant={getVariant('yearly')}
          >
            Yearly
          </Button>
        </div>
      </div>

      <div className="flex space-x-4">
        {plans.map((plan) => {
          const selectedPrice = plan.prices.find(({ name }) => {
            return name.toLowerCase() === selectedCycle;
          });

          if (!selectedPrice) {
            console.warn(
              `No price found for ${selectedCycle}. You may need to add a price to the ${plan.name} plan.`,
            );

            return null;
          }

          return (
            <form key={selectedPrice.price} action={createCheckoutAction}>
              <div
                className="flex flex-col space-y-4 p-6 rounded-xl border
            border-gray-100 shadow-sm dark:border-slate-800"
              >
                <h2 className="font-semibold text-lg">{plan.name}</h2>

                <div className="flex items-center space-x-1">
                  <span className="text-2xl font-bold">
                    ${selectedPrice.price}
                  </span>
                  <span className="lowercase text-sm">
                    /{selectedPrice.name}
                  </span>
                </div>

                <div className="flex flex-col space-y-1">
                  {plan.features.map((feature) => {
                    return (
                      <div
                        key={feature}
                        className="flex space-x-2.5 items-center text-sm"
                      >
                        <CheckCircleIcon className="w-4 h-4 text-green-500" />
                        <span>{feature}</span>
                      </div>
                    );
                  })}
                </div>

                <input type="hidden" name="priceId" value={selectedPrice?.id} />

                <Button variant={'outline'}>Subscribe</Button>
              </div>
            </form>
          );
        })}
      </div>
    </div>
  );
}

export default PricingTable;
