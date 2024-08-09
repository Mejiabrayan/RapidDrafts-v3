import getSupabaseServerComponentClient from '@/lib/supabase/server-component-client';

const loadSession = async () => {
  const client = getSupabaseServerComponentClient();
  const { data } = await client.auth.getUser();

  return data.user ?? undefined;
};

export default loadSession;
