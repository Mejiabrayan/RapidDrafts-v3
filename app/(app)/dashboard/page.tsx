import { Link } from 'next-view-transitions';
import { redirect } from 'next/navigation';
import { ArrowRightIcon, PlusIcon } from 'lucide-react';
import { fetchPosts } from '@/lib/queries/posts';
import { Button } from '@/components/ui/button';
import getSupabaseServerComponentClient from '@/lib/supabase/server-component-client';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

async function DashboardPage() {
  const posts = await fetchDashboardPageData();

  return (
    <div className="p-4 sm:p-6 md:p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl sm:text-2xl font-medium">Your Drafts</h1>
      </div>
      {posts.length ? (
        <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-1 lg:grid-cols-2">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <EmptyState />
      )}
    </div>
  );
}

export default DashboardPage;

function PostCard({ post }: any) {
  return (
    <Link href={`/dashboard/${post.uuid}`} className="block h-full">
      <Card className="bg-white p-4 sm:p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 h-full flex flex-col justify-between items-end overflow-y-scroll">
        <div>
          <CardTitle className="text-base sm:text-lg font-medium mb-2 truncate text-pretty">
            {post.title}
          </CardTitle>
          <CardContent className="text-xs sm:text-sm text-gray-500 mb-4 line-clamp-2">
            {post.content}
          </CardContent>
        </div>
        <p className="text-xs text-gray-400 mt-auto">
          {new Date(post.created_at).toLocaleDateString()}
        </p>
      </Card>
    </Link>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center h-64 bg-gray-50 rounded-lg p-4 text-center">
      <p className="text-gray-500 mb-4 text-sm sm:text-base">No posts created yet.</p>
      <Button variant="outline" className="w-full sm:w-auto">
        <Link href="/new" className="flex items-center justify-center space-x-2">
          <p>Create your first post</p>
          <ArrowRightIcon className="w-4 h-4" />
        </Link>
      </Button>
    </div>
  );
}

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
