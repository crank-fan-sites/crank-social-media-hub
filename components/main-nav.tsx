import * as React from 'react';
import Link from 'next/link';
import { NavItem } from '@/types/nav';
import { cn } from '@/lib/utils';
import { Icons } from './icons';
interface MainNavProps {
  items?: NavItem[];
}

export function MainNav({ items }: MainNavProps) {
  return (
    <div className="hidden md:flex md:pl-4 gap-6 md:gap-10">
      {items?.length ? (
        <nav className="flex gap-6">
          {items?.map(
            (item, index) =>
              item.href && (
                <Link
                  key={index}
                  href={item.href}
                  target={item.target}
                  className={cn(
                    'flex items-center text-sm font-light uppercase underline-offset-4 hover:underline',
                    item.disabled &&
                      'cursor-not-allowed opacity-80 hover:no-underline'
                  )}
                  aria-disabled={item.disabled}
                >
                  {item.title}
                  {item.external && (
                    <Icons.arrowUpRight strokeWidth="1.5" className="h-4 w-4" />
                  )}
                </Link>
              )
          )}
        </nav>
      ) : null}
    </div>
  );
}
