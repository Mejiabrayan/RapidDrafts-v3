'use client';

import type { FormEventHandler } from 'react';
import { useCallback } from 'react';
import { AlertTriangleIcon, CheckIcon } from 'lucide-react';

import useSignInWithOtp from '@/app/auth/hooks/use-sign-in-with-otp';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

const MagicLinkSignInForm: React.FC = () => {
  const signInWithOtpMutation = useSignInWithOtp();

  const onSubmit: FormEventHandler<HTMLFormElement> = useCallback(
    async (event) => {
      event.preventDefault();

      const target = event.currentTarget;
      const data = new FormData(target);
      const email = data.get('email') as string;

      const origin = window.location.origin;
      const redirectUrl = [origin, '/auth/callback'].join('');

      await signInWithOtpMutation.mutateAsync({
        email,
        options: {
          emailRedirectTo: redirectUrl,
        },
      });
    },
    [signInWithOtpMutation],
  );

  if (signInWithOtpMutation.data) {
    return <SuccessAlert />;
  }

  return (
    <form className={'w-full'} onSubmit={onSubmit}>
      <div className={'flex flex-col space-y-4'}>
        <Label className={'flex flex-col space-y-1.5'}>
          <span>Email</span>
          <Input
            required
            type="email"
            placeholder={'your@email.com'}
            name={'email'}
          />
        </Label>

        <Button disabled={signInWithOtpMutation.isPending}>
          {signInWithOtpMutation.isPending
            ? 'Sending email link...'
            : 'Send email link'}
        </Button>
      </div>

      {signInWithOtpMutation.isError ? <ErrorAlert /> : null}
    </form>
  );
};

export default MagicLinkSignInForm;

function SuccessAlert() {
  return (
    <Alert variant="default">
      <CheckIcon className="h-4 w-4 !text-green-500" />
      <AlertTitle className="text-green-500">
        Click on the link in your Email
      </AlertTitle>
      <AlertDescription>
        We sent you a link to your email! Follow the link to sign in.
      </AlertDescription>
    </Alert>
  );
}

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
