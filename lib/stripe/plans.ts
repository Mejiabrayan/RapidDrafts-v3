const BASIC_PLAN_TOKENS = Number(process.env.BASIC_PLAN_TOKENS);
const PRO_PLAN_TOKENS = Number(process.env.PRO_PLAN_TOKENS);
const FREE_PLAN_TOKENS = Number(process.env.FREE_PLAN_TOKENS);


const plans = [
  {
    name: 'Free',
    description: 'A free plan to get started',
    features: [`Limited tokens per month`, `Community Support`],
    prices: [
      {
        id: 'free',
        name: 'Monthly',
        description: 'Free plan',
        price: 0,
        tokens: FREE_PLAN_TOKENS,
      },
    ],
  },
  {
    name: 'Basic',
    description: 'A basic plan for regular users',
    features: [`Enjoy up to 500,000 tokens per month`, `Email Support`],
    prices: [
      {
        id: 'price_1MneNXEi65PUrsksgIFkkiIE',
        name: 'Monthly',
        description: 'A monthly plan',
        price: 9.99,
        tokens: BASIC_PLAN_TOKENS,
      },
    ],
  },
  {
    name: 'Pro',
    description: 'A pro plan for ambitious writers',
    features: [`Enjoy up to 3 million tokens per month`, `Chat Support`],
    prices: [
      {
        id: 'price_1MneOIEi65PUrskssNFqzIeB',
        name: 'Monthly',
        description: 'A monthly plan',
        price: 19.99,
        tokens: PRO_PLAN_TOKENS,
      },
    ],
  },
];

export default plans;
