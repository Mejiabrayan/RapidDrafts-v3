import { use } from 'react';

import { fetchPostByUid } from '@/lib/queries/posts';
import { updatePostAction } from '@/lib/actions/posts';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import getSupabaseServerComponentClient from '@/lib/supabase/server-component-client';

interface EditPostPageParams {
  params: {
    id: string;
  };
}

function EditPage({ params }: EditPostPageParams) {
  const post = use(loadPost(params.id));

  return (
    <div className="flex flex-col space-y-4 max-w-3xl mx-auto pb-16">
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold">
          Edit Post &quot;{post.title}&quot;
        </h1>
      </div>

      <form action={updatePostAction}>
        <div className="flex flex-col space-y-4">
          <input type="hidden" name="uid" value={post.uuid} />

          <Label className="flex flex-col space-y-1.5">
            <span>Title</span>
            <Input name="title" defaultValue={post.title} required />
          </Label>

          <Label className="flex flex-col space-y-1.5">
            <span>Description</span>
            <Input
              name="description"
              defaultValue={post.description ?? ''}
              required
            />
          </Label>

          <Label className="flex flex-col space-y-1.5">
            <span>Content</span>
            <Textarea
              className="min-h-[300px]"
              name="content"
              defaultValue={post.content}
              required
            />
          </Label>

          <Button>Save</Button>
        </div>
      </form>
    </div>
  );
}

export default EditPage;

async function loadPost(id: string) {
  const client = getSupabaseServerComponentClient();
  const { data, error } = await fetchPostByUid(client, id);

  if (error) {
    throw error;
  }

  return data;
}
