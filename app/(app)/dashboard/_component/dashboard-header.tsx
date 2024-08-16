'use client';

import React, { useState, useEffect } from 'react';
import { Bell, HelpCircle, Search, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    media.addListener(listener);
    return () => media.removeListener(listener);
  }, [matches, query]);

  return matches;
};

const DashboardHeader = () => {
  const isSmallScreen = useMediaQuery('(max-width: 768px)');

  const SearchBar = () => (
    <div className="relative w-full sm:w-64 mr-2">
      <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
      <Input
        type="text"
        placeholder="Search drafts..."
        className="pl-8 pr-4 w-full"
      />
    </div>
  );

  const IconButtons = () => (
    <>
      <Button variant="ghost" size="icon">
        <Bell className="h-5 w-5" />
      </Button>
      <Button variant="ghost" size="icon">
        <HelpCircle className="h-5 w-5" />
      </Button>
    </>
  );

  const UpgradeButton = () => (
    <Button className="bg-gradient-to-tr from-[#1994ff] to-[#157cff] text-white">
      <Link href="/upgrade-plan">Upgrade Plan</Link>
    </Button>
  );

  const SmallScreenHeader = () => (
    <div className="flex items-center justify-between w-full">
      <SearchBar />
      <IconButtons />
    </div>
  );

  const LargeScreenHeader = () => (
    <>
      <div className="flex items-center flex-1">
        <SearchBar />
        <Button variant="outline">Filters</Button>
      </div>
      <div className="flex items-center space-x-4">
        <IconButtons />
        <UpgradeButton />
      </div>
    </>
  );

  return (
    <header className="sticky top-0 z-40 py-4 bg-gray-50">
      <div className="container mx-auto px-4 flex items-center justify-between">
        {isSmallScreen ? <SmallScreenHeader /> : <LargeScreenHeader />}
      </div>
    </header>
  );
};

export default DashboardHeader;
