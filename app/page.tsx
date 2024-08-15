import Link from 'next/link';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import PricingTable from '../components/PricingTable';

export default async function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white py-5">
      <main className="flex-grow">
        <div className="container mx-auto space-y-14 py-8 border border-black/15 rounded-2xl">
          <header className="bg-white border-gray-100 dark:border-slate-800">
            <div className="container mx-auto flex items-center justify-between py-4">
              <Link href="/">
              <Image src="/logo.svg" alt="RapidDrafts Logo" width={100} height={50} />
              </Link>
              <nav className="hidden md:flex space-x-6">
                <Link
                  href="/solution"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Pricing
                </Link>
                <Link
                  href="/features"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Features
                </Link>

                <Link
                  href="/resources"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Blogs
                </Link>
              </nav>
              <Button>
                <Link href="/auth/sign-in">Sign In</Link>
              </Button>
            </div>
          </header>
          <div className="flex flex-col space-y-8">
            <div className="flex justify-center">
              <span className="py-2 px-4 rounded-full shadow-md dark:shadow-gray-500 text-sm bg-blue-100 text-blue-800">
                Supercharge your content production
              </span>
            </div>

            <h1 className="text-4xl lg:text-5xl 2xl:text-6xl font-medium text-center max-w-4xl mx-auto bg-gradient-to-r from-blue-700 via-blue-400 to-blue-300 text-transparent bg-clip-text py-2">
              AI-Powered Content Creation for Marketing Agencies
            </h1>

            <h2 className="text-center text-lg xl:text-xl text-gray-600 font-light max-w-3xl mx-auto text-balance">
              <p>
                RapidDrafts is your AI writing assistant that helps marketing
                agencies scale content production without sacrificing quality.
              </p>
            </h2>
            <div className="flex space-x-2 justify-center">
              <Button className="text-white px-8 py-6 text-lg">
                <Link href="/auth/sign-up">Start Free Trial</Link>
              </Button>
            </div>
            <p className="text-center text-sm text-gray-500">
              No credit card required. 14-day free trial.
            </p>
          </div>
          <div className="flex justify-center relative">
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-blue-300 to-blue-400 rounded-lg blur opacity-75"></div>
              <div className="relative">
                <Image
                  src="/screenshot.png"
                  alt="Product Screenshot"
                  className="max-w-full h-auto rounded-lg shadow-xl relative z-10"
                  width={1000}
                  height={800}
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="w-full bg-white border-gray-200 space-y-12">
        <div className="container mx-auto py-6">
          <div className="flex flex-col space-y-4 lg:flex-row lg:space-y-0 justify-between">
            <div>
      <Image src="/logo.svg" alt="RapidDrafts Logo" width={100} height={50} />
              <div className="text-gray-600">
                Empowering agencies with AI-driven content creation -{' '}
                {new Date().getFullYear()}
              </div>
            </div>
            <div className="flex space-x-4">
              <Button variant="link">
                <Link href="/auth/sign-in">Sign In</Link>
              </Button>
              <Button variant="link">
                <Link href="/auth/sign-up">Start Free Trial</Link>
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
