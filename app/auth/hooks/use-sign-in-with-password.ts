import { SignInWithPasswordCredentials } from '@supabase/supabase-js';
import { useMutation } from '@tanstack/react-query';
import useSupabase from '@/lib/supabase/use-supabase';

function useSignInWithPassword() {
  const client = useSupabase();

  const mutationFn = async (credentials: SignInWithPasswordCredentials) => {
    const response = await client.auth.signInWithPassword(credentials);

    if (response.error) {
      throw response.error.message;
    }

    return response.data;
  };

  return useMutation({ mutationFn });
}

export default useSignInWithPassword;
