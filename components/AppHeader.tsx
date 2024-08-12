import Link from 'next/link';
import ProfileDropdown from './ProfileDropdown';
import NavLink from './NavLink';

function AppHeader() {
  return (
    <div className="p-4 dark:border-slate-800 flex justify-end items-center">
      <ProfileDropdown />
    </div>
  );
}

export default AppHeader;
