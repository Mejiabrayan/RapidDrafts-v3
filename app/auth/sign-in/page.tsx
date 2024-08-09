import Link from 'next/link';
import EmailPasswordSignInForm from './components/EmailPasswordSignInForm';

export const metadata = {
  title: 'Sign In',
};

function SignInPage() {
  return (
    <div className='flex flex-col space-y-4 w-full'>
      <EmailPasswordSignInForm />

      <div className='text-sm'>
        <span>Don&apos;t have an account yet?</span> <Link className='underline' href='/auth/sign-up'>Sign Up</Link>
      </div>
    </div>
  );
}

export default SignInPage;