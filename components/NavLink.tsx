'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

function NavLink(props: React.PropsWithChildren<{
  href: string;
}>) {
  const pathName = usePathname();
  const className = props.href.includes(pathName) ? 'font-semibold' : 'text-gray-500 dark:text-gray-400 hover:underline';

  return (
    <li>
      <Link className={className} href={props.href}>
        {props.children}
      </Link>
    </li>
  )
}

export default NavLink