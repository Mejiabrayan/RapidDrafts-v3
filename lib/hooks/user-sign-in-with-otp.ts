import { useMutation } from '@tanstack/react-query';
import type { SignInWithPasswordlessCredentials } from '@supabase/gotrue-js';
import useSupabase from '@/lib/supabase/use-supabase';
 
function useSignInWithOtp() {
  const client = useSupabase();
 
  const mutationFn = async (credentials: SignInWithPasswordlessCredentials) => {
    const result = await client.auth.signInWithOtp(credentials);
 
    if (result.error) {
      throw result.error.message;
    }
 
    return result.data;
  };
 
  return useMutation({ mutationFn });
}
 
export default useSignInWithOtp;