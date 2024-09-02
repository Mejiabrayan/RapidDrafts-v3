import { permanentRedirect } from 'next/navigation';
import getSupabaseServerComponentClient from '@/lib/supabase/server-component-client';
import Image from 'next/image';

async function AuthLayout({ children }: React.PropsWithChildren) {
  await assertUserIsSignedOut();

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="flex-1 flex items-center justify-center bg-white p-4 md:p-0">
        <div className="w-full max-w-md px-4 py-8 md:px-8">{children}</div>
      </div>
      <div className="hidden md:flex md:flex-1 relative overflow-hidden">
        <Image
          src="/rd.png"
          alt="Auth Image"
          layout="fill"
          className="object-contain shadow-xl"
        />
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

  if (user) {
    permanentRedirect('/dashboard');
  }
}
