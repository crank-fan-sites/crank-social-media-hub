import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { Icons } from './icons';
import { MainNav } from './main-nav';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/router';

export function SiteHeader() {
  const { theme } = useTheme();
  const router = useRouter();
  return (
    <header className="bg-stone-50/80 dark:bg-stone-900/80 backdrop-blur-md sticky top-0 z-40 w-full border-t border-b border-stone-400 dark:border-stone-600">
      <div className="flex p-4 md:px-6 items-center space-x-0 justify-between">
        <span
          className="text-sm uppercase cursor-pointer"
          onClick={() => router.push('/')}
        >
          Buddyhead <span className="text-lg">☭</span>
        </span>
        <MainNav items={siteConfig.mainNav} />
        <span className="flex md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <span className="uppercase text-sm flex flex-row">
                Menu
                <Icons.menu className="h-5 w-5 ml-1" strokeWidth="1.5" />
              </span>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-stone-50 dark:bg-stone-900 rounded-none border border-stone-400 dark:border-stone-600">
              <DropdownMenuItem onClick={() => router.push('/')}>
                Home
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push('/blog')}>
                Zine
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push('/label')}>
                Label
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push('/contact')}>
                Contact
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link
                  href="https://buddyheadstore.myshopify.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-row align-middle"
                >
                  Merch{' '}
                  <Icons.arrowUpRight strokeWidth="1.5" className="h-4 w-4" />
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </span>
      </div>
    </header>
  );
}
