'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { User } from '@supabase/supabase-js';
import { LogOut, LayoutDashboard, UserIcon } from 'lucide-react';

import { Avatar, AvatarFallback } from './ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

import useUserSession from '../lib/hooks/use-user-session';
import useSignOut from '../lib/hooks/use-sign-out';

function ProfileDropdown() {
  const user = useUserSession();
  const signOut = useSignOut();
  const displayName = useDisplayName(user);

  return (
    <div className="flex justify-end">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="cursor-pointer hover:opacity-80 transition-opacity">
            <AvatarFallback>{displayName}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-48" align="start">
          <DropdownMenuLabel className="font-semibold">My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <Link href="/dashboard">
              <DropdownMenuItem className="flex items-center">
                <LayoutDashboard className="mr-2 h-4 w-4" />
                <span>Dashboard</span>
              </DropdownMenuItem>
            </Link>
          </DropdownMenuGroup>
          <DropdownMenuItem onClick={signOut} className="flex items-center text-red-500 hover:text-red-600">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default ProfileDropdown;

function useDisplayName(user: User | undefined) {
  return useMemo(() => {
    if (!user) {
      return null;
    }

    const { email, user_metadata } = user;

    if (user_metadata?.full_name) {
      return user_metadata.full_name.substring(0, 2).toUpperCase();
    }

    if (email) {
      return email.substring(0, 2).toUpperCase();
    }

    return <UserIcon className="h-4 w-4" />;
  }, [user]);
}
