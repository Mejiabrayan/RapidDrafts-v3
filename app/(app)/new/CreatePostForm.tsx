'use client';

import { useFormStatus } from 'react-dom';
import { useCompletion } from 'ai/react';
import { useState } from 'react';
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { createPostAction } from '@/lib/actions/posts';

function CreatePostForm() {
  const [title, setTitle] = useState('');

  if (title) {
    return (
      <form action={createPostAction}>
        <input type="hidden" name="title" value={title} />

        <div className="flex flex-col space-y-8">
          <div className="flex flex-col space-y-2">
            <div>You are creating the following post:</div>

            <div className="p-4 border rounded-xl text-sm">{title}</div>
          </div>

          <div className="flex space-x-2">
            <Button
              className="flex space-x-2.5 items-center"
              variant={'ghost'}
              onClick={() => setTitle('')}
            >
              <ArrowLeftIcon className="w-4 h-4" />
              <span>Go Back</span>
            </Button>

            <SubmitButton />
          </div>
        </div>
      </form>
    );
  }

  return <StreamTitlesForm setTitle={setTitle} />;
}

function StreamTitlesForm({ setTitle }: { setTitle: (title: string) => void }) {
  const { complete, isLoading, completion, setCompletion, stop } =
    useCompletion({
      api: '/openai/stream',
    });

  if (completion) {
    const titles = completion.split('\n');

    return (
      <div className="flex flex-col space-y-4">
        <div>
          <h2 className="text-lg font-semibold">Select a title</h2>

          <h3 className="text-gray-400">
            Click on a title to select it and continue.
          </h3>
        </div>

        <div className="flex flex-col space-y-2">
          {titles.map((title, index) => {
            return (
              <div
                onClick={() => setTitle(title)}
                role="button"
                key={index}
                className="p-4 border rounded-xl text-sm hover:bg-gray-50 cursor-pointer dark:hover:bg-slate-800"
              >
                {title}
              </div>
            );
          })}
        </div>

        <div className="flex space-x-2 items-center">
          <Button
            className="flex items-center space-x-1"
            variant={'ghost'}
            onClick={() => {
              stop();
              setCompletion('');
            }}
          >
            <ArrowLeftIcon className="w-4 h-4" />
            <span>Try a different topic</span>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();

        const target = e.target as HTMLFormElement;
        const topic = new FormData(target).get('topic') as string;

        complete(topic);
      }}
    >
      <div className="flex flex-col space-y-4">
        <div>
          <Label className="flex flex-col space-y-2">
            <span>Enter the topic of your post</span>

            <Input
              name="topic"
              placeholder="Ex. A post about Next.js"
              required
            />

            <span className="text-xs text-gray-400">
              Be as specific as possible. For example, instead of &quot;A post
              about Next.js&quot;, try &quot;A post about Next.js and how to use
              it with Supabase&quot;.
            </span>
          </Label>
        </div>

        <div>
          <GenerateTitlesButton isLoading={isLoading} />
        </div>
      </div>
    </form>
  );
}

function GenerateTitlesButton({ isLoading }: { isLoading: boolean }) {
  return (
    <Button className="flex space-x-2.5" disabled={isLoading}>
      {isLoading ? (
        'Generating titles...'
      ) : (
        <>
          <span>Generate Titles</span>
          <ArrowRightIcon className="w-4 h-4" />
        </>
      )}
    </Button>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  if (pending) {
    return <Button disabled={true}>Creating article...</Button>;
  }

  return (
    <Button className="flex space-x-2 items-center">
      <span>Create Article</span>

      <ArrowRightIcon className="w-4 h-4" />
    </Button>
  );
}

export default CreatePostForm;
