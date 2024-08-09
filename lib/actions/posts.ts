'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

import OpenAI from 'openai';
import ChatCompletion = OpenAI.ChatCompletion;

import { SupabaseClient } from '@supabase/supabase-js';
import getSupabaseServerActionClient from '@/lib/supabase/action-client';

import getOpenAIClient from '../openai-client';
import { deletePost, insertPost, updatePost } from '../mutations/posts';
import { getUserThresholds } from '../queries/thresholds';
import { updateUserTokens } from '../mutations/thresholds';

interface GeneratePostParams {
  title: string;
}

const MODEL = `gpt-3.5-turbo`;

export async function createPostAction(formData: FormData) {
  const title = formData.get('title') as string;

  const client = getSupabaseServerActionClient();
  const { data, error } = await client.auth.getUser();

  if (error) {
    throw error;
  }

  const userId = data.user.id;
  const currentTokens = await validateContentGenerationRequest(client, userId);

  const { text: content, usage } = await generatePostContent({
    title,
  });

  // update the user's token count
  const updatedTokens = currentTokens - usage;

  // we use the admin client here because we bypass RLS
  const adminClient = getSupabaseServerActionClient({ admin: true });
  await updateUserTokens(adminClient, userId, updatedTokens);

  // insert the post into the database
  const { uuid } = await insertPost(client, {
    title,
    content,
    user_id: data.user.id,
  });

  revalidatePath(`/dashboard`, 'page');

  redirect(`/dashboard/${uuid}`);
}

export async function updatePostAction(formData: FormData) {
  const title = formData.get('title') as string;
  const description = formData.get('description') as string | undefined;
  const content = formData.get('content') as string;
  const uid = formData.get('uid') as string;

  const client = getSupabaseServerActionClient();

  await updatePost(client, {
    title,
    content,
    description,
    uid,
  });

  const postPath = `/dashboard/${uid}`;

  revalidatePath(postPath, 'page');

  redirect(postPath);
}

export async function deletePostAction(uid: string) {
  const client = getSupabaseServerActionClient();
  const postPath = `/dashboard`;

  await deletePost(client, uid);

  revalidatePath(postPath, 'page');

  redirect(postPath);
}

async function generatePostContent(params: GeneratePostParams) {
  const client = getOpenAIClient();
  const content = getCreatePostPrompt(params);

  const response = await client.chat.completions.create({
    temperature: 0.7,
    model: MODEL,
    max_tokens: 500,
    messages: [
      {
        role: 'user' as const,
        content,
      },
    ],
  });

  const usage = response.usage?.total_tokens ?? 0;
  const text = getResponseContent(response);

  return {
    text,
    usage,
  };
}

function getCreatePostPrompt(params: GeneratePostParams) {
  return `
    Write a blog post under 500 words whose title is "${params.title}".
  `;
}

function getResponseContent(response: ChatCompletion) {
  return (response.choices ?? []).reduce((acc, choice) => {
    return acc + (choice.message?.content ?? '');
  }, '');
}

async function validateContentGenerationRequest(
  client: SupabaseClient,
  userId: string,
  minTokens = 500,
) {
  const { tokens } = await getUserThresholds(client, userId);

  if (tokens < minTokens) {
    throw new Error(
      `You have ${tokens} tokens left, but you need at least ${minTokens} tokens to use the API.`,
    );
  }

  return tokens;
}
