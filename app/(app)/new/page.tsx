import { PencilIcon } from 'lucide-react';
import CreatePostForm from './CreatePostForm';

function NewPostPage() {
  return (
    <div className="container">
      <div className="flex flex-col flex-1 space-y-8">
        <div className="flex justify-between items-start">
          <h1 className="text-2xl font-semibold flex space-x-4 items-center">
            <PencilIcon className="w-5 h-5" />

            <span>New Post</span>
          </h1>
        </div>

        <CreatePostForm />
      </div>
    </div>
  );
}

export default NewPostPage;
