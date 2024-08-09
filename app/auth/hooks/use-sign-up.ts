import { SignUpWithPasswordCredentials } from '@supabase/supabase-js';
import { useMutation } from '@tanstack/react-query';
import useSupabase from '@/lib/supabase/use-supabase';

function useSignUp() {
  const client = useSupabase();

  const mutationFn = async (credentials: SignUpWithPasswordCredentials) => {
    const emailRedirectTo = [window.location.origin, '/auth/callback'].join('');

    const options = {
      emailRedirectTo,
      ...(credentials.options ?? {}),
    };

    const response = await client.auth.signUp({
      ...credentials,
      options,
    });

    if (response.error) {
      throw response.error.message;
    }

    return response.data;
  };

  return useMutation({
    mutationFn,
  });
}

export default useSignUp;
