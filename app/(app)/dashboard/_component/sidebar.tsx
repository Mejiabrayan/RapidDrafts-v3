'use client';

import { useState } from 'react';
import {
  LucideFileText,
  LucideHome,
  LucideSettings,
  LucideChevronLeft,
  LucideChevronRight,
  LucidePlus,
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
import { redirect } from 'next/navigation';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const user = useUserSession();

  return (
    <aside
      className={`${
        isCollapsed ? 'w-16' : 'w-64'
      } h-screen flex flex-col bg-white border-r border-gray-200 transition-all duration-300 ease-in-out`}
    >
      {isCollapsed ? (
        <CollapsedSidebar setIsCollapsed={setIsCollapsed} />
      ) : (
        <ExpandedSidebar setIsCollapsed={setIsCollapsed} user={user} />
      )}
    </aside>
  );
};

const CollapsedSidebar = ({ setIsCollapsed }) => (
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
        icon={<LucideHome size={20} />}
        tooltip="Dashboard"
      />
      <SidebarIcon
        href="/new"
        icon={<LucideFileText size={20} />}
        tooltip="Posts"
      />
      <SidebarIcon
        href="/settings"
        icon={<LucideSettings size={20} />}
        tooltip="Settings"
      />
    </nav>
    <div className="p-4 mt-auto flex justify-center">
      <ProfileDropdown />
    </div>
  </>
);

const ExpandedSidebar = ({ setIsCollapsed, user }) => (
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
        variant={'ghost'}
      >
        <LucideChevronLeft size={20} />
      </Button>
    </div>
    <div className="px-4 mb-4">
      <Link href="/new">
        <Button className="w-full justify-start" variant="outline">
          <LucidePlus className="mr-2 h-4 w-4" />
          Create Post
        </Button>
      </Link>
    </div>
    <nav className="flex-1 px-2 py-4 space-y-1">
      <SidebarLink
        href="/dashboard"
        icon={<LucideHome size={20} />}
        text="Dashboard"
      />
      <SidebarLink
        href="/posts"
        icon={<LucideFileText size={20} />}
        text="Posts"
      />
      <SidebarLink
        href="/settings"
        icon={<LucideSettings size={20} />}
        text="Settings"
      />
    </nav>
    <div className="p-4 mt-auto flex items-center">
      <ProfileDropdown />
      <div className="ml-3 overflow-hidden">
        {user?.email && (
          <p className="text-xs text-gray-500 truncate">{user.email}</p>
        )}
      </div>
    </div>
  </>
);

const SidebarLink = ({ href, icon, text }) => (
  <Link
    href={href}
    className="flex items-center px-2 py-2 rounded-lg transition-colors duration-150 ease-in-out text-gray-700 hover:bg-gray-100"
  >
    <span className="mr-3">{icon}</span>
    <span className="font-medium">{text}</span>
  </Link>
);

const SidebarIcon = ({ href, icon, tooltip }) => (
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
