import Link from 'next/link';
import EmailPasswordSignUpForm from './components/EmailPasswordSignUpForm';
import Image from 'next/image';

export const metadata = {
  title: 'Sign Up',
};

function SignUpPage() {
  return (
    <div className='flex flex-col space-y-8 w-full'>
      <div className="text-center">
        <Image src="/logo.svg" alt="RapidDrafts Logo" width={150} height={50} className="mx-auto mb-6" />
        <h1 className="text-3xl font-bold mb-2">Create your account</h1>
        <p className="text-gray-600">Start your 14-day free trial</p>
      </div>

      <EmailPasswordSignUpForm />

      <div className='text-sm text-center'>
        <span>Already have an account?</span>{' '}
        <Link className='text-blue-600 hover:underline' href='/auth/sign-in'>Sign In</Link>
      </div>
    </div>
  );
}

export default SignUpPage;