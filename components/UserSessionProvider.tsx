'use client';

import { useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import UserSessionContext from './UserSessionContext';

function UserSessionProvider(
  props: React.PropsWithChildren<{
    user: User | undefined;
  }>,
) {
  const [user, setUser] = useState<User | undefined>(props.user);

  useEffect(() => {
    setUser(props.user);
  }, [props.user]);

  return (
    <UserSessionContext.Provider value={{ user, setUser }}>
      {props.children}
    </UserSessionContext.Provider>
  );
}

export default UserSessionProvider;
