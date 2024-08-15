import { Suspense } from 'react';
import { fetchPostByUid } from '@/lib/queries/posts';
import { updatePostAction } from '@/lib/actions/posts';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import getSupabaseServerComponentClient from '@/lib/supabase/server-component-client';

interface EditPostPageParams {
  params: {
    id: string;
  };
}

async function EditPage({ params }: EditPostPageParams) {
  const post = await loadPost(params.id);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Suspense fallback={<div className="text-center">Loading...</div>}>
        <EditForm post={post} />
      </Suspense>
    </div>
  );
}

function EditForm({ post }) {
  return (
    <form action={updatePostAction} className="space-y-8 max-w-3xl mx-auto">
      <input type="hidden" name="uid" value={post.uuid} />

      <div className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl mx-auto">
        <Input
          name="title"
          defaultValue={post.title}
          required
          className="text-3xl sm:text-4xl md:text-3xl font-bold border-none px-4 py-2 w-full focus:outline-none focus:ring-0 bg-gray-50 text-balance"
          placeholder="Title"
        />

        <Input
          name="description"
          defaultValue={post.description ?? ''}
          required
          className="text-lg sm:text-xl text-gray-600 border-none px-4 py-2 w-full focus:outline-none focus:ring-0 bg-gray-50 mt-4"
          placeholder="Add a description..."
        />

        <Textarea
          name="content"
          defaultValue={post.content}
          required
          className="min-h-[50vh] sm:min-h-[60vh] md:min-h-[70vh] border-none px-4 py-2 w-full focus:outline-none ring-offset-0 focus:ring-0 mt-6"
          placeholder="Start writing your post..."
        />
      </div>

      <div className="flex justify-end mt-8">
        <Button type="submit" className="px-6 py-2">
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