'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Bell, HelpCircle, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { fetchPosts } from '@/lib/queries/posts';
import getSupabaseBrowserClient from '@/lib/supabase/browser-client';
import debounce from 'lodash/debounce';

type Post = {
  id: number;
  title: string;
};

const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState<boolean>(false);

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

const SearchBar: React.FC<{
  searchTerm: string;
  onSearchChange: (term: string) => void;
  filteredPosts: Post[];
}> = React.memo(({ searchTerm, onSearchChange, filteredPosts }) => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="relative w-full sm:w-64 mr-2">
      <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
      <Input
        type="text"
        placeholder="Search drafts..."
        className="pl-8 pr-4 w-full"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        onFocus={() => setIsSearchFocused(true)}
        onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
        ref={searchInputRef}
      />
      {isSearchFocused && filteredPosts.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onMouseDown={(e) => e.preventDefault()} // Prevent blur event
              onClick={() => {
                console.log(`Clicked on post: ${post.title}`);
                onSearchChange(post.title);
                setIsSearchFocused(false);
              }}
            >
              {post.title}
            </div>
          ))}
        </div>
      )}
    </div>
  );
});

SearchBar.displayName = 'SearchBar';

const IconButtons: React.FC = () => (
  <>
    <Button variant="ghost" size="icon">
      <Bell className="h-5 w-5" />
    </Button>
    <Button variant="ghost" size="icon">
      <HelpCircle className="h-5 w-5" />
    </Button>
  </>
);

const UpgradeButton: React.FC = () => (
  <Button className="bg-gradient-to-tr from-[#1994ff] to-[#157cff] text-white">
    <Link href="/upgrade-plan">Upgrade Plan</Link>
  </Button>
);

const DashboardHeader: React.FC = () => {
  const isSmallScreen = useMediaQuery('(max-width: 768px)');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const supabase = getSupabaseBrowserClient();
    const getUserData = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          setUserId(user.id);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError('Failed to fetch user data. Please try again.');
      }
    };
    getUserData();
  }, []);

  useEffect(() => {
    const getUserPosts = async () => {
      if (userId) {
        setIsLoading(true);
        setError(null);
        try {
          const supabase = getSupabaseBrowserClient();
          const { data, error } = await fetchPosts(supabase, userId);
          if (error) throw error;
          setUserPosts(data as Post[]);
        } catch (error) {
          console.error('Error fetching posts:', error);
          setError('Failed to fetch posts. Please try again.');
        } finally {
          setIsLoading(false);
        }
      }
    };
    getUserPosts();
  }, [userId]);

  const debouncedSearch = useCallback(
    debounce((term: string) => {
      if (term.trim() !== '') {
        const filtered = userPosts.filter((post) =>
          post.title.toLowerCase().includes(term.toLowerCase())
        );
        setFilteredPosts(filtered);
      } else {
        setFilteredPosts([]);
      }
    }, 300),
    [userPosts]
  );

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
    debouncedSearch(term);
  };

  return (
    <header className="sticky top-0 z-40 py-4 bg-gray-50">
      <div className="container mx-auto px-4 flex items-center justify-between">
        {isSmallScreen ? (
          <div className="flex items-center justify-between w-full">
            <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} filteredPosts={filteredPosts} />
            <IconButtons />
          </div>
        ) : (
          <>
            <div className="flex items-center flex-1">
              <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} filteredPosts={filteredPosts} />
            </div>
            <div className="flex items-center space-x-4">
              <IconButtons />
              <UpgradeButton />
            </div>
          </>
        )}
      </div>
      {isLoading && <div className="text-center py-2">Loading posts...</div>}
      {error && <div className="text-center py-2 text-red-500">{error}</div>}
    </header>
  );
};

export default DashboardHeader;