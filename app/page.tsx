import Link from 'next/link';
import { Button } from '@/components/ui/button';
import PricingTable from '../components/PricingTable';

export default async function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white py-5">
      <main className="flex-grow">
        <div className="container mx-auto space-y-14 py-8 border border-black/10 rounded-xl">
          <header className="bg-white  border-gray-100 dark:border-slate-800 ">
            <div className="container mx-auto flex items-center justify-between py-4">
              <Link href="/">
                <b>RapidDrafts</b>
              </Link>
              <Button>
                <Link href="/auth/sign-in">Sign In</Link>
              </Button>
            </div>
          </header>
          <div className="flex flex-col space-y-8">
            <div className="flex justify-center">
              <span className="py-2 px-4 rounded-full shadow dark:shadow-gray-500 text-sm bg-blue-100 text-blue-800">
                Supercharge your content production
              </span>
            </div>

            <h1 className="text-4xl lg:text-5xl 2xl:text-6xl font-medium text-center max-w-4xl mx-auto text-black">
              AI-Powered Content Creation for Marketing Agencies
            </h1>

            <h2 className="text-center text-lg xl:text-xl text-gray-600 font-light max-w-3xl mx-auto text-balance">
              <p>
                RapidDrafts is your AI writing assistant that helps marketing
                agencies scale content production without sacrificing quality.
              </p>
              <p>
                Generate SEO-optimized blog posts, social media content, and ad
                copy in minutes.
              </p>
              <p className="font-medium text-blue-600">
                Boost your agency&apos;s productivity by 10x.
              </p>
            </h2>
          </div>

          <div className="flex flex-col space-y-3 ">
            <div className="flex space-x-2 justify-center">
              <Button className="text-white px-8 py-3 text-lg">
                <Link href="/auth/sign-up">Start Free Trial</Link>
              </Button>
            </div>
            <p className="text-center text-sm text-gray-500">
              No credit card required. 14-day free trial.
            </p>
          </div>

          <hr className="border-gray-200" />

          <div className="flex flex-col space-y-12">
            <div className="flex flex-col space-y-2">
              <h2 className="text-3xl font-semibold text-center">
                Revolutionize Your Content Workflow
              </h2>
              <h3 className="text-xl text-center text-gray-600">
                Trusted by 500+ marketing agencies worldwide
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
              <div className="flex flex-col space-y-2">
                <h3 className="text-xl font-medium text-blue-600">
                  1. AI-Powered Drafting
                </h3>
                <p className="text-gray-600">
                  Generate high-quality, SEO-optimized content drafts in
                  seconds. Save hours on research and writing.
                </p>
              </div>
              <div className="flex flex-col space-y-2">
                <h3 className="text-xl font-medium text-blue-600">
                  2. Multi-Format Content
                </h3>
                <p className="text-gray-600">
                  Create blog posts, social media updates, email newsletters,
                  and ad copy all from one platform.
                </p>
              </div>
              <div className="flex flex-col space-y-2">
                <h3 className="text-xl font-medium text-blue-600">
                  3. Streamlined Collaboration
                </h3>
                <p className="text-gray-600">
                  Effortlessly manage client approvals, team edits, and content
                  calendars in one place.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col space-y-8">
            <div className="flex flex-col space-y-2">
              <h2 className="text-3xl font-semibold text-center">
                Flexible Pricing for Growing Agencies
              </h2>
              <h3 className="text-xl text-center text-gray-600">
                Scale your content production without breaking the bank
              </h3>
            </div>
            <PricingTable />
          </div>
        </div>
      </main>

      <footer className="w-full bg-white border-t border-gray-200">
        <div className="container mx-auto py-6">
          <div className="flex flex-col space-y-4 lg:flex-row lg:space-y-0 justify-between">
            <div>
              <b className="text-blue-600">RapidDrafts</b>
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
