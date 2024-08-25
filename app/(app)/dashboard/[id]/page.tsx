import { use } from 'react';
// import Link from 'next/link';
import { PencilIcon } from 'lucide-react';
import { parseISO, format } from 'date-fns';

import { Button } from '@/components/ui/button';
import { fetchPostByUid } from '@/lib/queries/posts';
import DeletePostButton from './components/DeletePostButton';
import { Suspense } from 'react';
import getSupabaseServerComponentClient from '@/lib/supabase/server-component-client';
import { Link } from 'next-view-transitions';

interface PostPageParams {
  params: {
    id: string;
  };
}

function PostPage({ params }: PostPageParams) {
  const post = use(loadPost(params.id));

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 ">
      <Suspense fallback={<PostLoadingSkeleton />}>
        <PostContent post={post} params={params} />
      </Suspense>
    </div>
  );
}

function PostContent({ post, params }: any) {
  return (
    <>
      <div className="space-y-8 max-w-3xl mx-auto overflow-y-scroll">
        <div className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-3xl text-pretty w-full font-bold mb-4 text-gray-600 ">
            {post.title}
          </h1>

          {post.description && (
            <p className="text-lg sm:text-base text-gray-600 mb-6">
              {post.description}
            </p>
          )}

          <div className="whitespace-pre-wrap text-base">{post.content}</div>
        </div>

        <div className="flex justify-end space-x-4 mt-8">
          <Button variant="outline" className="flex items-center space-x-2">
            <PencilIcon className="w-4 h-4" />
            <Link href={`/dashboard/${params.id}/edit`}>Edit</Link>
          </Button>

          <DeletePostButton uid={params.id} />
        </div>
      </div>
    </>
  );
}

const PostLoadingSkeleton = () => {
  return (
    <div className="space-y-8 max-w-3xl mx-auto animate-pulse">
      <div className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl mx-auto">
        <div className="h-12 bg-gray-200 rounded w-3/4 mb-4"></div>

        <div className="h-6 bg-gray-200 rounded w-full mb-6"></div>

        <div className="space-y-4">
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-11/12"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-10/12"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-9/12"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-11/12"></div>
        </div>
      </div>

      <div className="flex justify-end space-x-4 mt-8">
        <div className="h-10 w-20 bg-gray-200 rounded"></div>
        <div className="h-10 w-20 bg-gray-200 rounded"></div>
      </div>
    </div>
  );
};

async function loadPost(id: string) {
  const client = getSupabaseServerComponentClient();
  const { data, error } = await fetchPostByUid(client, id);

  if (error) {
    throw error;
  }

  return data;
}

export default PostPage;
