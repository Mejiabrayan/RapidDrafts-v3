import { Database } from '@/database.types';
import { SupabaseClient } from '@supabase/supabase-js';

type Client = SupabaseClient<Database>;

export async function fetchPosts(client: Client, userId: string) {
  return client
    .from('posts')
    .select(
      `
      id,
      uuid,
      title,
      description,
      content,
      created_at
  `
    )
    .eq('user_id', userId);
}

export async function fetchPostByUid(client: Client, uid: string) {
  return client
    .from('posts')
    .select(
      `
      id,
      uuid,
      title,
      description,
      content
  `
    )
    .eq('uuid', uid)
    .single();
}
