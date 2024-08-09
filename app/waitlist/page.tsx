'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import getSupabaseBrowserClient from '../../lib/supabase/browser-client';

export default function Waitlist() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setIsLoading(true);
  
    try {
      const supabase = getSupabaseBrowserClient();
      const { data, error } = await supabase.functions.invoke('resend', {
        body: { email },
      });
  
      if (error) throw error;
  
      if (data.id) {  // Resend returns an 'id' field on successful email send
        setMessage('Successfully joined the waitlist! Check your email for confirmation.');
        setEmail('');
      } else {
        throw new Error(data.message || 'Failed to send welcome email');
      }
    } catch (error) {
      console.error('Error details:', error);
      setMessage(error.message || 'An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <div className="max-w-md px-4 py-8 space-y-4 text-center">
        <h1 className="text-3xl font-bold">Join Our Waitlist</h1>
        <p className="text-muted-foreground">
          Be the first to know when we launch. Enter your email below to join
          our exclusive waitlist.
        </p>
        <form
          onSubmit={handleSubmit}
          className="flex w-full max-w-sm flex-col space-y-2"
        >
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isLoading}
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Signing Up...' : 'Sign Up'}
          </Button>
        </form>
        {message && (
          <p className={`text-sm font-medium ${message.includes('Successfully') ? 'text-green-600' : 'text-red-600'}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
}