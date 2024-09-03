import { Suspense } from 'react';
import { fetchPostByUid } from '@/lib/queries/posts';
import { updatePostAction } from '@/lib/actions/posts';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import getSupabaseServerComponentClient from '@/lib/supabase/server-component-client';
import Spinner from '@/components/Spinner';

interface EditPostPageParams {
  params: {
    id: string;
  };
}

async function EditPage({ params }: EditPostPageParams) {
  const post = await loadPost(params.id);

  return (
    <div className="h-full w-full flex flex-col">
      <Suspense fallback={<div className="flex-grow flex justify-center items-center"><Spinner /></div>}>
        <EditForm post={post} />
      </Suspense>
    </div>
  );
}

function EditForm({ post }: any) {
  return (
    <form action={updatePostAction} className="flex flex-col h-full bg-black">
      <input type="hidden" name="uid" value={post.uuid} />

      <div className="flex-grow flex flex-col space-y-6 overflow-auto">
        <Input
          name="title"
          defaultValue={post.title}
          required
          className="text-3xl font-bold border-none px-0 w-full focus:outline-none focus:ring-0 bg-transparent placeholder-gray-300"
          placeholder="Enter your title"
        />

        <Input
          name="description"
          defaultValue={post.description ?? ''}
          className="text-lg text-gray-600 border-none px-0 w-full focus:outline-none focus:ring-0 bg-transparent placeholder-gray-300"
          placeholder="Add a brief description..."
        />

        <Textarea
          name="content"
          defaultValue={post.content}
          required
          className="flex-grow border-none px-0 w-full focus:outline-none focus:ring-0 bg-transparent placeholder-gray-300 resize-none h-screen"
          placeholder="Start writing your post..."
        />
      </div>

      <div className="mt-4 flex justify-end">
        <Button type="submit" className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition duration-200">
          Save Changes
        </Button>
      </div>
    </form>
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

export default EditPage;
