import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: `Page not found`,
};

function NotFoundPage() {
  return (
    <div
      className={
        'm-auto flex w-full h-screen items-center justify-center'
      }
    >
      <div className={'flex flex-col space-y-8'}>
        <div className={'flex space-x-8 divide-x divide-gray-100'}>
          <div>
            <h2 className='text-3xl font-bold'>
              <span>
                404
              </span>
            </h2>
          </div>

          <div className={'flex flex-col space-y-4 pl-8'}>
            <div className={'flex flex-col space-y-1'}>
              <div>
                <span className='font-medium text-xl'>
                  Page not found
                </span>
              </div>

              <p className={'text-gray-500 text-sm dark:text-gray-300'}>
                Sorry, we couldn&apos;t find the page you&apos;re looking for.
              </p>
            </div>

            <div className={'flex space-x-4'}>
              <Button>
                <Link href={'/'}>
                  Back to Home Page
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;