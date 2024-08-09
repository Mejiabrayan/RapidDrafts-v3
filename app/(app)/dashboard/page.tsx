import Link from 'next/link';
import { redirect } from 'next/navigation';

import { ArrowRightIcon, LucideLayoutDashboard } from 'lucide-react';

import { fetchPosts } from '@/lib/queries/posts';
import { Button } from '@/components/ui/button';
import getSupabaseServerComponentClient from '@/lib/supabase/server-component-client';

async function DashboardPage() {
  const posts = await fetchDashboardPageData();

  return (
    <div className="container">
      <div className="flex flex-col flex-1 space-y-8">
        <div className="flex justify-between items-start">
          <h1 className="text-2xl font-semibold flex space-x-4 items-center">
            <LucideLayoutDashboard className="w-5 h-5" />

            <span>Dashboard</span>
          </h1>

          <Button>
            <Link href="/new">Create New Post</Link>
          </Button>
        </div>

        <div className="flex flex-col space-y-4">
          {posts.length ? null : <EmptyState />}

          {posts.map((post) => {
            return (
              <Link href={'/dashboard/' + post.uuid} key={post.id}>
                <h2 className="text-lg font-medium">{post.title}</h2>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;

async function fetchDashboardPageData() {
  const client = getSupabaseServerComponentClient();
  const { data: userResponse } = await client.auth.getUser();
  const user = userResponse?.user;

  if (!user) {
    redirect('/auth/sign-in');
  }

  const { data, error } = await fetchPosts(client, user.id);

  if (error) {
    throw error;
  }

  return data;
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center space-y-8">
      <span>No posts created yet.</span>

      <div>
        <Button variant={'outline'}>
          <Link href="/new" className="flex items-center space-x-2">
            <span>Create a post to get started</span>

            <ArrowRightIcon className="w-4 h-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
