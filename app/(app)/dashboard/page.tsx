import Link from 'next/link';
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
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-medium">Your Drafts</h1>
      </div>
      {posts.length ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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

function PostCard({ post }) {
  return (
    <Link href={`/dashboard/${post.uuid}`} className="block">
      <Card className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
        <CardTitle>
          <h2 className="text-lg font-medium mb-2 truncate">{post.title}</h2>
        </CardTitle>
        <CardDescription>
          <p className="text-sm text-gray-500 mb-4 line-clamp-2">
            {post.description || 'No description'}
          </p>
        </CardDescription>
        <div className="text-xs text-gray-400">
          {new Date(post.created_at).toLocaleDateString()}
        </div>
      </Card>
    </Link>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center h-64 bg-gray-50 rounded-lg">
      <p className="text-gray-500 mb-4">No posts created yet.</p>
      <Button variant="outline">
        <Link href="/new" className="flex items-center space-x-2">
          <span>Create your first post</span>
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
