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
<form className="w-full space-y-4 md:space-y-6" onSubmit={handleSubmit}>
<div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          autoComplete="off"
          required
          type="email"
          name="email"
          className="w-full p-3 border rounded-lg"
          placeholder="Enter your email"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          required
          type="password"
          name="password"
          className="w-full p-3 border rounded-lg"
          placeholder="Enter your password"
        />
      </div>

      {isError ? <ErrorAlert /> : null}

      <Button
        disabled={isPending}
        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-200"
      >
        {isPending ? 'Signing in...' : 'Sign In'}
      </Button>
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