'use client';

import React, { useState, useEffect } from 'react';
import {
  LucideFileText,
  LucideHome,
  LucideSettings,
  LucideChevronLeft,
  LucideChevronRight,
  LucidePlus,
  LucideIcon,
  BookOpen,
  Workflow,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import ProfileDropdown from '@/components/ProfileDropdown';
import useUserSession from '@/lib/hooks/use-user-session';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import getSupabaseServerComponentClient from '@/lib/supabase/server-component-client';
import useMediaQuery from '@/lib/hooks/use-media-query';
import ThresholdDisplay from '@/components/threshold-display';

interface User {
  email: string;
}

const Sidebar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const user = useUserSession() as User | null;
  const isSmallScreen = useMediaQuery('(max-width: 768px)');

  useEffect(() => {
    setIsCollapsed(isSmallScreen);
  }, [isSmallScreen]);

  return (
    <aside
      className={`${
        isCollapsed ? 'w-16' : 'w-64'
      } h-screen flex flex-col bg-white border-r border-gray-200 transition-all duration-300 ease-in-out fixed z-50`}
    >
      {isCollapsed ? (
        <CollapsedSidebar setIsCollapsed={setIsCollapsed} />
      ) : (
        <ExpandedSidebar setIsCollapsed={setIsCollapsed} user={user} />
      )}
    </aside>
  );
};

interface CollapsedSidebarProps {
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

const CollapsedSidebar: React.FC<CollapsedSidebarProps> = ({
  setIsCollapsed,
}) => (
  <>
    <div className="p-4 flex justify-center">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              onClick={() => setIsCollapsed(false)}
              className="p-1 rounded-full hover:bg-gray-100"
            >
              <LucideChevronRight size={20} />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>Expand Menu</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
    <nav className="flex-1 px-2 py-4 space-y-4">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link href="/new">
              <Button variant="ghost" size="icon" className="w-full">
                <LucidePlus size={20} />
              </Button>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>Create a new post</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <SidebarIcon
        href="/dashboard"
        icon={<BookOpen size={20} />}
        tooltip="Content library"
      />
      <SidebarIcon
        href="/dashboard/campaigns"
        icon={<Workflow size={20} />}
        tooltip="Campaigns"
      />
      <SidebarIcon
        href="/settings"
        icon={<LucideSettings size={20} />}
        tooltip="Settings"
      />
    </nav>
    <div className="p-4 mt-auto flex justify-center cursor-pointer">
      <ProfileDropdown />
    </div>
  </>
);

interface ExpandedSidebarProps {
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  user: User | null;
}

const ExpandedSidebar: React.FC<ExpandedSidebarProps> = ({
  setIsCollapsed,
  user,
}) => (
  <>
    <div className="flex items-center justify-between p-4">
      <Image
        src="/logo.svg"
        alt="RapidDrafts Logo"
        width={100}
        height={50}
        draggable={false}
      />
      <Button
        onClick={() => setIsCollapsed(true)}
        className="p-1 rounded-full hover:bg-gray-100"
        variant="ghost"
      >
        <LucideChevronLeft size={20} />
      </Button>
    </div>
    <div className="px-4 mb-4">
      <Link href="/dashboard/new">
        <Button className="w-full justify-start" variant="outline">
          <LucidePlus className="mr-2 h-4 w-4" />
          Create Post
        </Button>
      </Link>
    </div>
    <nav className="flex-1 px-2 py-4 space-y-1">
      <SidebarLink
        href="/dashboard"
        icon={<BookOpen size={20} />}
        text="Content Library"
      />
      <SidebarLink
        href="/dashboard/campaigns"
        icon={<Workflow size={20} />}
        text="Campaigns"
      />
      <SidebarLink
        href="/dashboard/settings"
        icon={<LucideSettings size={20} />}
        text="Settings"
      />
    </nav>
    <div className="px-4 py-2">
      <ThresholdDisplay />
    </div>
    <div className="p-4 mt-auto flex items-center cursor-pointer">
      <ProfileDropdown />
      <div className="ml-3 overflow-hidden">
        {user?.email && (
          <p className="text-xs text-gray-500 truncate">{user.email}</p>
        )}
      </div>
    </div>
  </>
);

interface SidebarLinkProps {
  href: string;
  icon: React.ReactElement<LucideIcon>;
  text: string;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ href, icon, text }) => (
  <Link
    href={href}
    className="flex items-center px-2 py-2 rounded-lg transition-colors duration-150 ease-in-out text-gray-700 hover:bg-gray-100"
  >
    <span className="mr-3">{icon}</span>
    <span className="font-medium">{text}</span>
  </Link>
);

interface SidebarIconProps {
  href: string;
  icon: React.ReactElement<LucideIcon>;
  tooltip: string;
}

const SidebarIcon: React.FC<SidebarIconProps> = ({ href, icon, tooltip }) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <Link
          href={href}
          className="flex items-center justify-center p-2 rounded-lg transition-colors duration-150 ease-in-out text-gray-700 hover:bg-gray-100"
        >
          {icon}
        </Link>
      </TooltipTrigger>
      <TooltipContent side="right">
        <p>{tooltip}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

export default Sidebar;
