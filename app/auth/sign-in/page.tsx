import Link from 'next/link';
import EmailPasswordSignInForm from './components/EmailPasswordSignInForm';
import MagicLinkSignInForm from '../components/MagicLinkSignInForm';
import OAuthSignInProviders from '../components/OAuthSignInProviders';

export const metadata = {
  title: 'Sign In',
};
function SignInPage() {
  return (
    <div className="flex flex-col space-y-4 w-full">
      <EmailPasswordSignInForm />

      <hr />

      <OAuthSignInProviders />

      <div className="text-sm">
        <span>Don&apos;t have an account yet?</span>{' '}
        <Link className="underline" href="/auth/sign-up">
          Sign Up
        </Link>
      </div>
    </div>
  );
}

export default SignInPage;
