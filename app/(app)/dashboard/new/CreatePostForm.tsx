'use client'
import React, { useState } from 'react';
import { useFormStatus } from 'react-dom';
import { useCompletion } from 'ai/react';
import { ArrowLeftIcon, ArrowRightIcon, Sparkles, Edit3, PenLine } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { createPostAction } from '@/lib/actions/posts';

function CreatePostForm() {
  const [step, setStep] = useState(1);
  const [title, setTitle] = useState('');
  const [topic, setTopic] = useState('');

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    <div className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-medium text-center text-black">
        Create your draft
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={`step-${step}`} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="step-1">Topic</TabsTrigger>
            <TabsTrigger value="step-2">Generate</TabsTrigger>
            <TabsTrigger value="step-3">Refine</TabsTrigger>
          </TabsList>
          <TabsContent value="step-1">
            <TopicInput topic={topic} setTopic={setTopic} nextStep={nextStep} />
          </TabsContent>
          <TabsContent value="step-2">
            <StreamTitlesForm topic={topic} setTitle={setTitle} nextStep={nextStep} prevStep={prevStep} />
          </TabsContent>
          <TabsContent value="step-3">
            <ConfirmPost title={title} prevStep={prevStep} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </div>
  );
}

function TopicInput({ topic, setTopic, nextStep }: any) {
  return (
    <div className="space-y-4 mt-4">
      <Label className="flex flex-col space-y-2">
        <span className="text-lg font-semibold">What&lsquo;s your post about?</span>
        <Input
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Ex. Next.js and Supabase integration"
          required
        />
        <span className="text-sm text-gray-500">
          Be specific to get better title suggestions!
        </span>
      </Label>
      <Button onClick={nextStep} disabled={!topic.trim()} className="w-full">
        Next <ArrowRightIcon className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
}

function StreamTitlesForm({ topic, setTitle, nextStep, prevStep }: any) {
  const { complete, isLoading, completion, setCompletion, stop } = useCompletion({
    api: '/openai/stream',
  });

  React.useEffect(() => {
    if (topic) {
      complete(topic);
    }
  }, [topic, complete]);

  if (isLoading) {
    return (
      <div className="space-y-4 mt-4">
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-gray-600">
              AI is generating content based on your topic...
            </p>
            <div className="flex justify-center mt-4">
              <Sparkles className="h-8 w-8 text-blue-500 animate-pulse" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (completion) {
    const titles = completion.split('\n').filter(Boolean);

    return (
      <div className="space-y-4 mt-4">
        <h3 className="text-lg font-semibold">Choose a catchy title:</h3>
        <div className="space-y-2">
          {titles.map((title, index) => (
            <Button
              key={index}
              variant="outline"
              className="w-full justify-start text-left"
              onClick={() => {
                setTitle(title);
                nextStep();
              }}
            >
              {title}
            </Button>
          ))}
        </div>
        <div className="flex justify-between">
          <Button variant="ghost" onClick={prevStep}>
            <ArrowLeftIcon className="mr-2 h-4 w-4" /> Back
          </Button>
          <Button variant="outline" onClick={() => setCompletion('')}>
            <Sparkles className="mr-2 h-4 w-4" /> Regenerate
          </Button>
        </div>
      </div>
    );
  }

  return null;
}

function ConfirmPost({ title, prevStep }: any) {
  return (
    <form action={createPostAction} className="space-y-4 mt-4">
      <input type="hidden" name="title" value={title} />
      <Card>
        <CardContent className="pt-6">
          <p className="font-medium">Generated Title:</p>
          <p className="mt-2 text-gray-600">{title}</p>
        </CardContent>
      </Card>
      <div className="flex space-x-2">
        <Button type="button" variant="outline" className="flex-1" onClick={prevStep}>
          <PenLine className="mr-2 h-4 w-4" /> Edit
        </Button>
        <SubmitButton />
      </div>
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="flex-1">
      {pending ? 'Creating...' : 'Finalize'}
      <ArrowRightIcon className="ml-2 h-4 w-4" />
    </Button>
  );
}

export default CreatePostForm;