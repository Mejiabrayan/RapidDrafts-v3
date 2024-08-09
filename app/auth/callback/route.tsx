import 'server-only';

import type { NextRequest } from 'next/server';
import { redirect } from 'next/navigation';
import getSupabaseRouteHandlerClient from '@/lib/supabase/route-handler-client';

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');

  if (code) {
    const client = getSupabaseRouteHandlerClient();

    await client.auth.exchangeCodeForSession(code);
  }

  return redirect('/dashboard');
}
