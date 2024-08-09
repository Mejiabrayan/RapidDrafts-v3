const BASIC_PLAN_TOKENS = Number(process.env.BASIC_PLAN_TOKENS);
const PRO_PLAN_TOKENS = Number(process.env.PRO_PLAN_TOKENS);

const plans = [
  {
    name: 'Basic',
    description: 'A basic plan for everyone',
    features: [`Enjoy up to 500,000 tokens per month`, `Email Support`],
    trialPeriodDays: 7,
    prices: [
      {
        id: 'price_1MneNXEi65PUrsksgIFkkiIE',
        name: 'Monthly',
        description: 'A monthly plan',
        price: 9.99,
        tokens: BASIC_PLAN_TOKENS,
      },
      {
        id: 'price_1NRsbgEi65PUrsks1UNJcnEK',
        name: 'Yearly',
        description: 'A yearly plan',
        price: 99.99,
        tokens: BASIC_PLAN_TOKENS * 12,
      },
    ],
  },
  {
    name: 'Pro',
    description: 'A pro plan for ambitious writers',
    features: [`Enjoy up to 3 million tokens per month`, `Chat Support`],
    trialPeriodDays: 14,
    prices: [
      {
        id: 'price_1MneOIEi65PUrskssNFqzIeB',
        name: 'Monthly',
        description: 'A monthly plan',
        price: 29.99,
        tokens: PRO_PLAN_TOKENS,
      },
      {
        id: 'price_1NRsh6Ei65PUrsksS8JSHubP',
        name: 'Yearly',
        description: 'A yearly plan',
        price: 299.99,
        tokens: PRO_PLAN_TOKENS * 12,
      },
    ],
  },
];

export default plans;
