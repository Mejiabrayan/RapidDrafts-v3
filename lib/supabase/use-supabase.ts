import { useMemo } from 'react';
import getSupabaseBrowserClient from './browser-client';

function useSupabase() {
  return useMemo(getSupabaseBrowserClient, []);
}

export default useSupabase;
