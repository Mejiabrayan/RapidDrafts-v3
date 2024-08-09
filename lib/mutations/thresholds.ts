import { Database } from '@/database.types';
import { SupabaseClient } from '@supabase/supabase-js';

type Client = SupabaseClient<Database>;

export async function updateUserTokens(
  client: Client,
  userId: string,
  tokens: number
) {
  const { data, error } = await client
    .from('users_thresholds')
    .update({ tokens })
    .match({ user_id: userId });

  if (error) {
    throw error;
  }

  return data;
}
