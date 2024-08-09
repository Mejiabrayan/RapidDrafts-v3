'use client';

import { useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { User } from '@supabase/supabase-js';
import useSupabase from '../lib/supabase/use-supabase';

function AuthRedirectListener({
  children,
  user,
  redirectTo,
  privatePages,
}: React.PropsWithChildren<{
  user: User | undefined;
  redirectTo?: string;
  privatePages: string[];
}>) {
  const client = useSupabase();
  const router = useRouter();
  const redirectUserAway = useRedirectUserAway(privatePages);

  useEffect(() => {
    // keep this running for the whole session
    // unless the component was unmounted, for example, on log-outs
    const listener = client.auth.onAuthStateChange((state, user) => {
      // log user out if user is falsy
      if (!user && redirectTo) {
        return redirectUserAway(redirectTo);
      }
    });

    // destroy listener on un-mounts
    return () => listener.data.subscription.unsubscribe();
  }, [user, client.auth, redirectUserAway, redirectTo, router]);

  return children;
}

export default function AuthChangeListener({
  children,
  user,
  redirectTo,
  privatePages = [`/dashboard`, `/new`, `/subscription`],
}: React.PropsWithChildren<{
  user: User | undefined;
  redirectTo?: string;
  privatePages?: string[];
}>) {
  const shouldActivateListener = typeof window !== 'undefined';

  // we only activate the listener if
  // we are rendering in the browser
  if (!shouldActivateListener) {
    return <>{children}</>;
  }

  return (
    <AuthRedirectListener
      privatePages={privatePages}
      user={user}
      redirectTo={redirectTo}
    >
      {children}
    </AuthRedirectListener>
  );
}

function useRedirectUserAway(privatePages: string[] = []) {
  return useCallback(
    (path: string) => {
      const currentPath = window.location.pathname;

      // redirect user away from private pages
      if (privatePages.includes(currentPath)) {
        window.location.assign(path);
      }
    },
    [privatePages],
  );
}
