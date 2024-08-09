import { useContext } from 'react';
import UserSessionContext from '@/components/UserSessionContext';

function useUserSession() {
  const { user } = useContext(UserSessionContext);

  return user;
}

export default useUserSession;
