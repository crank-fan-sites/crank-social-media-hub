import Link from 'next/link';
import Image from 'next/image';
import { siteConfig } from '@/config/site';
import { buttonVariants } from '@/components/ui/button';
import { Icons } from './icons';
import { ThemeToggle } from '@/components/theme-toggle';
import Newsletter from '@/components/newsletter';
import { useTheme } from 'next-themes';
import { links } from '@/lib/links';
import { HeadingH6 } from './typography';

export function SiteFooter() {
  const { theme } = useTheme();
  return (
    <footer className="w-full bg-primary border-t border-b border-stone-400 dark:border-stone-600">
      <div className="flex flex-col md:flex-row">
        <div className="w-full py-12 px-2 md:w-7/12 md:px-4 md:border-r border-stone-400 dark:border-stone-600">
          <HeadingH6>look at this stuff</HeadingH6>
          <div className="grid grid-cols-1 gap-y-2">
            {links.map((link) => {
              return (
                <div className="mt-4" key={link.id}>
                  <div>
                    <a
                      href={link.url}
                      target="_blank"
                      className="hover:underline hover:italic"
                    >
                      {link.title}
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="w-full py-12 px-2 md:w-5/12 md:px-4">
          <Newsletter />
          <div className="flex flex-col items-center justify-center my-12 gap-y-6">
            <Image
              src="/images/Skull.png"
              alt="Buddyhead Skull Graphic"
              width={232}
              height={206}
              className="mt-6"
            />
            <small>haha oh hell yeah</small>
            <div className="flex justify-center items-center space-x-1">
              <Link
                href={siteConfig.links.facebook}
                target="_blank"
                rel="noreferrer"
              >
                <div
                  className={buttonVariants({
                    size: 'icon',
                    variant: 'ghost',
                  })}
                >
                  <Icons.facebook
                    className="h-5 w-5 fill-current"
                    strokeWidth="1.5"
                  />
                  <span className="sr-only">Facebook</span>
                </div>
              </Link>

              <Link
                href={siteConfig.links.instagram}
                target="_blank"
                rel="noreferrer"
              >
                <div
                  className={buttonVariants({
                    size: 'icon',
                    variant: 'ghost',
                  })}
                >
                  <Icons.instagram className="h-5 w-5" strokeWidth="1.5" />
                  <span className="sr-only">Instagram</span>
                </div>
              </Link>

              <Link
                href={siteConfig.links.twitch}
                target="_blank"
                rel="noreferrer"
              >
                <div
                  className={buttonVariants({
                    size: 'icon',
                    variant: 'ghost',
                  })}
                >
                  <Icons.twitch className="h-5 w-5" strokeWidth="1.5" />
                  <span className="sr-only">Twitch</span>
                </div>
              </Link>

              <Link
                href={siteConfig.links.twitter}
                target="_blank"
                rel="noreferrer"
              >
                <div
                  className={buttonVariants({
                    size: 'icon',
                    variant: 'ghost',
                  })}
                >
                  <Icons.twitter
                    className="h-5 w-5 fill-current"
                    strokeWidth="1.5"
                  />
                  <span className="sr-only">Twitter</span>
                </div>
              </Link>

              <Link
                href={siteConfig.links.youtube}
                target="_blank"
                rel="noreferrer"
              >
                <div
                  className={buttonVariants({
                    size: 'icon',
                    variant: 'ghost',
                  })}
                >
                  <Icons.youtube className="h-5 w-5" strokeWidth="1.5" />
                  <span className="sr-only">YouTube</span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col p-4 md:py-0 md:ps-0 md:flex-row items-center justify-between border-t border-stone-400 dark:border-stone-600">
        <ThemeToggle />
        <small>
          &copy;{new Date().getFullYear()} Buddyhead, all rights reserved
        </small>
      </div>
    </footer>
  );
}
