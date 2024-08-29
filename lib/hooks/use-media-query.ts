import { useState, useEffect } from 'react';

const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState<boolean>(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    
    const updateMatches = () => {
      setMatches(media.matches);
    };

    // Set initial value
    updateMatches();

    // Add listener for subsequent updates
    media.addEventListener('change', updateMatches);

    // Clean up listener on component unmount
    return () => {
      media.removeEventListener('change', updateMatches);
    };
  }, [query]);

  return matches;
};

export default useMediaQuery;