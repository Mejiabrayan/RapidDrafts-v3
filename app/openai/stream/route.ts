import getOpenAIClient from '@/lib/openai-client';
import { OpenAIStream, StreamingTextResponse } from 'ai';
import { NextRequest } from 'next/server';
import GPT3Tokenizer from 'gpt3-tokenizer';

import { updateUserTokens } from '@/lib/mutations/thresholds';
import { getUserThresholds } from '@/lib/queries/thresholds';
import getSupabaseRouteHandlerClient from '@/lib/supabase/route-handler-client';

// you can change this to any model you want
const MODEL = 'gpt-3.5-turbo' as const;

export async function POST(req: NextRequest) {
  const { prompt } = await req.json();
  const client = getOpenAIClient();

  const supabaseClient = getSupabaseRouteHandlerClient();
  const userResult = await supabaseClient.auth.getUser();
  const userId = userResult.data.user?.id;

  if (!userId) {
    throw new Error(`User is not logged in`);
  }

  // get the user's token count
  const { tokens } = await getUserThresholds(supabaseClient, userId);
  const maxTokens = 500;

  // make sure the user has enough tokens
  if (tokens < maxTokens) {
    throw new Error(`User does not have enough tokens`);
  }

  const response = await client.chat.completions.create({
    model: MODEL,
    stream: true,
    messages: getPromptMessages(prompt),
    max_tokens: maxTokens,
  });

  // process the stream to get the full text
  const stream = OpenAIStream(response);

  // pipe the stream through the transform stream
  const processedStream = pipeTransformStream(
    stream,
    // this callback will be called once the stream is completed
    async (fullText: string) => {
      // once the stream is done, use the GPT3 Tokenizer to count the number of tokens used
      const tokenizer = new GPT3Tokenizer({ type: 'gpt3' });

      // calculate the number of tokens used by the API
      const responseUsage = tokenizer.encode(fullText).text.length;
      const promptUsage = tokenizer.encode(prompt).text.length;
      const totalUsage = responseUsage + promptUsage;

      // update the user's token count in the database
      // by subtracting the number of tokens used by the API from the user's token count
      const adminClient = getSupabaseRouteHandlerClient({ admin: true });
      await updateUserTokens(adminClient, userId, tokens - totalUsage);
    },
  );

  return new StreamingTextResponse(processedStream);
}

function getPromptMessages(topic: string) {
  return [
    {
      content: `Given the topic "${topic}", return a list of possible titles for a blog post, without numbers or quotes. Separate each title with a new line. Create up to 5 titles.`,
      role: 'user' as const,
    },
  ];
}

function pipeTransformStream(
  stream: ReadableStream,
  onDone: (fullText: string) => unknown,
) {
  const decoder = new TextDecoder('utf-8');
  let content = '';

  const transformStream = new TransformStream({
    transform(chunk, controller) {
      // decode the chunk to a string
      content += decoder.decode(chunk);
      // pass data unchanged to the readable side
      controller.enqueue(chunk);
    },
    flush() {
      // call the callback with the full text
      onDone(content);
    },
  });

  // pipe the stream through the transform stream
  return stream.pipeThrough(transformStream);
}
