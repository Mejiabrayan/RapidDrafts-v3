'use client';

import { useRouter } from 'next/navigation';
import { AlertTriangleIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import useSignInWithPassword from '../../hooks/use-sign-in-with-password';

function EmailPasswordSignInForm() {
  const { isPending, isError, mutateAsync } = useSignInWithPassword();
  const router = useRouter();

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (
    event,
  ) => {
    event.preventDefault();

    const form = event.currentTarget;
    const data = new FormData(form);
    const email = data.get('email') as string;
    const password = data.get('password') as string;

    await mutateAsync({
      email,
      password,
    });

    return router.replace('/dashboard');
  };

  return (
    <form className="w-full" onSubmit={handleSubmit}>
      <div className="flex flex-col space-y-4">
        <h1 className="text-lg text-center font-semibold">Sign In</h1>

        <Label className="flex flex-col space-y-1.5">
          <span>Email</span>
          <Input autoComplete="off" required type="email" name="email" />
        </Label>

        <Label className="flex flex-col space-y-1.5">
          <span>Password</span>
          <Input required type="password" name="password" />
        </Label>

        {isError ? <ErrorAlert /> : null}

        <Button disabled={isPending}>
          {isPending ? 'Signing in...' : 'Sign In'}
        </Button>
      </div>
    </form>
  );
}

export default EmailPasswordSignInForm;

function ErrorAlert() {
  return (
    <Alert variant="destructive">
      <AlertTriangleIcon className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        We were not able to sign you in. Please try again.
      </AlertDescription>
    </Alert>
  );
}
