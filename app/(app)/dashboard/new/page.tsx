import { PencilIcon } from 'lucide-react';
import CreatePostForm from './CreatePostForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

function NewPostPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <CreatePostForm />
    </div>
  );
}

export default NewPostPage;
