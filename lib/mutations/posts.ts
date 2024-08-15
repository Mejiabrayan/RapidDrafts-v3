import { Database } from '@/database.types';
import { SupabaseClient } from '@supabase/supabase-js';

type Client = SupabaseClient<Database>;

interface InsertPostParams {
  title: string;
  content: string;
  user_id: string;
  created_at: string;
}

interface UpdatePostParams {
  title: string;
  content: string;
  description: string | undefined;
  uid: string;
}

export async function insertPost(client: Client, params: InsertPostParams) {
  const { data, error } = await client
    .from('posts')
    .insert(params)
    .select('uuid')
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function updatePost(
  client: Client,
  { uid, ...params }: UpdatePostParams
) {
  const { data, error } = await client
    .from('posts')
    .update(params)
    .match({ uuid: uid });

  if (error) {
    throw error;
  }

  return data;
}

export async function deletePost(client: Client, uuid: string) {
  const { data, error } = await client.from('posts').delete().match({ uuid });

  if (error) {
    throw error;
  }

  return data;
}