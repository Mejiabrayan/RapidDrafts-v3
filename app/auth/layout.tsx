import { permanentRedirect } from 'next/navigation';
import getSupabaseServerComponentClient from '@/lib/supabase/server-component-client';

async function AuthLayout({ children }: React.PropsWithChildren) {
  await assertUserIsSignedOut();

  return (
    <div className={'flex h-screen flex-col items-center justify-center space-y-4 md:space-y-8'}>
      <div className={`flex w-full dark:border-slate-800 max-w-sm flex-col items-center space-y-4 rounded-xl border-transparent px-2 py-1 dark:shadow-[0_0_1200px_0] dark:shadow-slate-400/30 md:w-8/12 md:border md:px-8 md:py-6 md:shadow-xl lg:w-5/12 lg:px-6 xl:w-4/12 2xl:w-3/12`}>
        {children}
      </div>
    </div>
  );
}

export default AuthLayout;

async function assertUserIsSignedOut() {
  const client = getSupabaseServerComponentClient();

  const {
    data: { user },
  } = await client.auth.getUser();

  // If session is not null, the user is logged in
  // `redirect` will throw an error that will be handled by Next.js
  if (user) {
    permanentRedirect('/dashboard');
  }
}