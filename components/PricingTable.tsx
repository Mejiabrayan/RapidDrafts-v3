'use client';

import { CheckIcon } from 'lucide-react';
import plans from '../lib/stripe/plans';
import { Button } from './ui/button';
import { createCheckoutAction } from '@/lib/actions/subscription';

function PricingTable() {
  return (
    <div className="flex flex-col space-y-8 items-center">
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
        {plans.map((plan, index) => {
          const price = plan.prices[0]; // Only one price per plan now
          const isMiddleCard = index === 1;

          return (
            <form key={price.id} action={createCheckoutAction} className="w-full md:w-1/3">
              <div className="relative">
                {isMiddleCard && (
                  <div className="absolute -inset-2 rounded-xl bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 opacity-75 blur"></div>
                )}
                <div
                  className={`relative flex flex-col h-full rounded-xl ${
                    isMiddleCard
                      ? 'shadow-lg transform scale-105 z-10'
                      : 'shadow-sm'
                  }`}
                >
                  <div
                    className={`flex flex-col h-96 space-y-6 p-6 rounded-xl ${
                      isMiddleCard
                        ? 'relative bg-white'
                        : 'bg-white border border-gray-200'
                    }`}
                  >
                    <div className="flex flex-col space-y-1">
                      <span className="text-sm font-medium text-gray-500">
                        {plan.name}
                      </span>
                      <div className="flex items-baseline">
                        <span className="text-4xl font-bold">${price.price}</span>
                        <span className="ml-1 text-sm text-gray-500">
                          / {price.name.toLowerCase()}
                        </span>
                      </div>
                      <span className="text-sm text-gray-500">
                        {index === 0 ? 'Best for blogs and personal websites' : 
                         index === 1 ? 'Best for small businesses and startups' : 
                         'Best for high traffic websites and resellers'}
                      </span>
                    </div>

                    <div className="flex flex-col space-y-3 pt-4 flex-grow">
                      {plan.features.map((feature) => (
                        <div
                          key={feature}
                          className="flex items-center space-x-3 text-sm"
                        >
                          <CheckIcon className="w-5 h-5 text-green-500 flex-shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>

                    <input
                      type="hidden"
                      name="priceId"
                      value={price.id}
                    />

                    <Button
                      variant={isMiddleCard ? 'default' : 'outline'}
                      className="w-full mt-auto py-2"
                    >
                      {isMiddleCard ? 'Start 14-day free trial' : 'Start free trial'}
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          );
        })}
      </div>
    </div>
  );
}

export default PricingTable;