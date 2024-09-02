import Link from 'next/link';
import Image from 'next/image';
import EmailPasswordSignInForm from './components/EmailPasswordSignInForm';
import OAuthSignInProviders from '../components/OAuthSignInProviders';

export const metadata = {
  title: 'Sign In',
};

function SignInPage() {
  return (
    <div className='flex flex-col space-y-6 md:space-y-8 w-full'>
      <div className="text-center">
        <Image src="/logo.svg" alt="RapidDrafts Logo" width={120} height={40} className="mx-auto mb-4 md:mb-6" />
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Welcome back</h1>
        <p className="text-sm md:text-base text-gray-600">Sign in to your account</p>
      </div>


      <EmailPasswordSignInForm />

      <hr className="my-6" />

      <OAuthSignInProviders />

      <div className='text-sm text-center'>
        <span>Don&apos;t have an account yet?</span>{' '}
        <Link className='text-blue-600 hover:underline' href='/auth/sign-up'>
          Sign Up
        </Link>
      </div>
    </div>
  );
}

export default SignInPage;