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
    <form className="w-full" onSubmit={handleSubmit}>
      <div className="flex flex-col space-y-4">
        <h1 className="text-lg text-center font-semibold">Create an account</h1>

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
          {isPending ? 'Signing up...' : 'Sign Up'}
        </Button>
      </div>
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
    <Alert variant="default">
      <CheckIcon className="h-4 w-4 !text-green-500" />
      <AlertTitle className="text-green-500">Confirm your Email</AlertTitle>
      <AlertDescription>
        Awesome, you&apos;re almost there! We&apos;ve sent you an email to
        confirm your email address. Please click the link in the email to
        complete your sign up.
      </AlertDescription>
    </Alert>
  );
}
