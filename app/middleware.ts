import { NextRequest, NextResponse } from 'next/server';
import createMiddlewareClient from '@/lib/supabase/middleware-client';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient(req, res);

  // Check if the user is authenticated
  const { data: { user } } = await supabase.auth.getUser();

  // If the user is accessing the dashboard or waitlist, check their authentication and waitlist status
  if (req.nextUrl.pathname === '/dashboard' || req.nextUrl.pathname === '/waitlist') {
    if (!user) {
      // If not logged in, redirect to sign-up page
      return NextResponse.redirect(new URL('/sign-up', req.url));
    }

    // Check the user's waitlist status
    const { data: waitlistEntry, error } = await supabase
      .from('waitlist')
      .select('approved')
      .eq('user_id', user.id)
      .single();

    if (error) {
      console.error('Error fetching waitlist status:', error);
      // Handle error (e.g., redirect to an error page)
      return NextResponse.redirect(new URL('/error', req.url));
    }

    if (req.nextUrl.pathname === '/dashboard' && (!waitlistEntry || !waitlistEntry.approved)) {
      // If accessing dashboard and not approved, redirect to waitlist page
      return NextResponse.redirect(new URL('/waitlist', req.url));
    }

    if (req.nextUrl.pathname === '/waitlist' && waitlistEntry?.approved) {
      // If accessing waitlist page and approved, redirect to dashboard
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }
  }

  return res;
}

export const config = {
  matcher: ['/dashboard', '/waitlist'],
}