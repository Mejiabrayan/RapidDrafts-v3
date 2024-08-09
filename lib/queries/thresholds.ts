import { Database } from '@/database.types';
import { SupabaseClient } from '@supabase/supabase-js';

type Client = SupabaseClient<Database>;

export async function getUserThresholds(client: Client, userId: string) {
  const { data, error } = await client
    .from('users_thresholds')
    .select(`tokens`)
    .eq('user_id', userId)
    .single();

  if (error) {
    throw error;
  }

  return data;
}
