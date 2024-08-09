import { createContext } from 'react';
import { User } from '@supabase/supabase-js';

const UserSessionContext = createContext<{
  user: User | undefined;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
}>({
  user: undefined,
  setUser: (_) => _,
});

export default UserSessionContext;
