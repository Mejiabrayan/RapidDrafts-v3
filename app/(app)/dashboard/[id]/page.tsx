import { use } from 'react';
import Link from 'next/link';
import { PencilIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { fetchPostByUid } from '@/lib/queries/posts';
import DeletePostButton from './components/DeletePostButton';

import getSupabaseServerComponentClient from '@/lib/supabase/server-component-client';

interface PostPageParams {
  params: {
    id: string;
  };
}

function PostPage({ params }: PostPageParams) {
  const post = use(loadPost(params.id));

  return (
    <div className="flex flex-col space-y-4 max-w-3xl mx-auto pb-16">
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold">{post.title}</h1>

        <div className="flex space-x-2.5">
          <Button variant={'link'} className="flex space-x-2">
            <PencilIcon className="w-3 h-3" />
            <Link href={`/dashboard/${params.id}/edit`}>Edit</Link>
          </Button>

          <DeletePostButton uid={params.id} />
        </div>
      </div>


      <div className="whitespace-break-spaces">{post.content}</div>
    </div>
  );
}

async function loadPost(id: string) {
  const client = getSupabaseServerComponentClient();
  const { data, error } = await fetchPostByUid(client, id);

  if (error) {
    throw error;
  }

  return data;
}

export default PostPage;
