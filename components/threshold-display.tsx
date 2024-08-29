'use client';

import React, { useEffect, useState } from 'react';
import { Progress } from '@/components/ui/progress';
import { getUserThresholds } from '@/lib/queries/thresholds';
import getSupabaseBrowserClient from '@/lib/supabase/browser-client';
import { SupabaseClient } from '@supabase/supabase-js';

interface ThresholdData {
  tokens: number;
}

const MAX_TOKENS = 3000; // This could be adjusted based on your needs

const ThresholdCard: React.FC<{ tokens: number }> = ({ tokens }) => {
  const percentage = Math.min((tokens / MAX_TOKENS) * 100, 100);

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span>Tokens used</span>
        <span>
          {tokens.toLocaleString()}/{MAX_TOKENS.toLocaleString()}
        </span>
      </div>
      <Progress value={percentage} className="w-full" />
    </div>
  );
};

const ThresholdDisplay: React.FC = () => {
  const [thresholdData, setThresholdData] = useState<ThresholdData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchThresholdData = async () => {
      try {
        const client: SupabaseClient = getSupabaseBrowserClient();
        const { data: userResponse, error: userError } = await client.auth.getUser();

        if (userError) throw userError;
        if (!userResponse?.user) throw new Error('User not found');

        const data = await getUserThresholds(client, userResponse.user.id);
        setThresholdData(data);
      } catch (err) {
        console.error('Failed to fetch user thresholds:', err);
        setError('Failed to fetch threshold data');
      }
    };

    fetchThresholdData();
  }, []);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!thresholdData) {
    return <div>Loading threshold data...</div>;
  }

  return <ThresholdCard tokens={thresholdData.tokens} />;
};

export default ThresholdDisplay;