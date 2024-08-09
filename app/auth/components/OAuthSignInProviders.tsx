'use client';

import Image from 'next/image';

import { Provider } from '@supabase/gotrue-js';
import { Button } from '@/components/ui/button';
import useSignInWithOAuth from '@/app/auth/hooks/use-sign-in-with-oauth';

const OAUTH_PROVIDERS: Provider[] = ['google'];

function OAuthSignInProviders() {
  const { mutateAsync } = useSignInWithOAuth();

  return (
    <div className={'flex flex-col space-y-2'}>
      {OAUTH_PROVIDERS.map((provider) => {
        return (
          <OAuthProviderButton
            key={provider}
            onClick={async () => {
              return mutateAsync({ provider });
            }}
          >
            <Image
              className={'rounded-full absolute left-2'}
              src={`/${provider}.png`}
              alt={`${provider} Logo`}
              width={21}
              height={21}
            />

            <span>
              Sign in with{' '}
              <span className={'capitalize ml-0.5'}>{provider}</span>
            </span>
          </OAuthProviderButton>
        );
      })}
    </div>
  );
}

export default OAuthSignInProviders;

function OAuthProviderButton(
  props: React.PropsWithChildren<{
    onClick: () => void;
  }>,
) {
  return (
    <Button
      className={'flex space-x-2 relative'}
      variant={'outline'}
      onClick={props.onClick}
    >
      {props.children}
    </Button>
  );
}
