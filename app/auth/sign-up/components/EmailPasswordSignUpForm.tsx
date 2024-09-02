'use client';

import { CheckIcon, AlertTriangleIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

import useSignUp from '../../hooks/use-sign-up';

function EmailPasswordSignUpForm() {
  const { isPending, isSuccess, isError, mutateAsync } = useSignUp();

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
  };

  if (isSuccess) {
    return <SuccessAlert />;
  }

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
          placeholder="Create a password"
        />
      </div>

      {isError ? <ErrorAlert /> : null}

      <Button
        disabled={isPending}
        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-200"
      >
        {isPending ? 'Signing up...' : 'Create Account'}
      </Button>
    </form>
  );
}

export default EmailPasswordSignUpForm;

function ErrorAlert() {
  return (
    <Alert variant="destructive">
      <AlertTriangleIcon className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        We were not able to sign you up. Please try again.
      </AlertDescription>
    </Alert>
  );
}

function SuccessAlert() {
  return (
    <Alert variant="default" className="bg-green-50 border-green-200">
      <CheckIcon className="h-4 w-4 text-green-500" />
      <AlertTitle className="text-green-700">Confirm your Email</AlertTitle>
      <AlertDescription className="text-green-600">
        Awesome, you&apos;re almost there! We&apos;ve sent you an email to confirm your
        email address. Please click the link in the email to complete your sign
        up.
      </AlertDescription>
    </Alert>
  );
}
