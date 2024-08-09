import Stripe from 'stripe';

const apiVersion = '2023-10-16';

export default async function getStripeInstance() {
  return new Stripe(getStripeKey(), {
    apiVersion,
  });
}

function getStripeKey() {
  const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;

  if (!STRIPE_SECRET_KEY) {
    throw new Error(
      `'STRIPE_SECRET_KEY' environment variable was not provided`,
    );
  }

  return STRIPE_SECRET_KEY;
}
