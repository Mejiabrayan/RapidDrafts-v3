'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: `An unexpected error occurred`,
};

function NotFoundPage() {
  return (
    <main>
      <div
        className={
          'm-auto flex min-h-[50vh] w-full items-center justify-center'
        }
      >
        <div className={'flex flex-col space-y-8'}>
          <div className={'flex space-x-8 divide-x divide-gray-100'}>
            <div>
              <h2 className='text-3xl font-bold'>
                <span>
                  500
                </span>
              </h2>
            </div>

            <div className={'flex flex-col space-y-4 pl-8'}>
              <div className={'flex flex-col space-y-1'}>
                <div>
                  <span className='font-medium text-xl'>
                    An unexpected error occurred
                  </span>
                </div>

                <p className={'text-gray-500 text-sm dark:text-gray-300'}>
                  Sorry, we encountered an unexpected error while processing your request.
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
    </main>
  );
}

export default NotFoundPage;