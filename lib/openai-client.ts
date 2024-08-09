import OpenAI from 'openai';

const apiKey = process.env.OPENAI_API_KEY;

if (!apiKey) {
  throw new Error('OPENAI_API_KEY env variable is not set');
}

function getOpenAIClient() {
  return new OpenAI({ apiKey });
}

export default getOpenAIClient;
