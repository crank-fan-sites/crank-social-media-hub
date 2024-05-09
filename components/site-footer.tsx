import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { buttonVariants } from "@/components/ui/button";
import { Icons } from "./icons";
import { ThemeToggle } from "@/components/theme-toggle";
// import Newsletter from "@/components/newsletter";
import { useTheme } from "next-themes";
import { links } from "@/lib/links";
import { HeadingH6 } from "./typography";
import FooterLinks from "@/components/layout/footer-links";

export function SiteFooter({ footerLinks }: { footerLinks: any[] }) {
  const { theme } = useTheme();
  return (
    <footer className="w-full border-t border-b bg-primary border-stone-400 dark:border-stone-600">
      <div className="flex flex-col md:flex-row">
        <div className="w-full px-2 py-12 md:w-7/12 md:px-4 md:border-r border-stone-400 dark:border-stone-600">
          <HeadingH6>Links</HeadingH6>
          <div className="grid grid-cols-1 gap-y-2">
            <FooterLinks links={footerLinks} />
          </div>
        </div>

        <div className="w-full px-2 py-12 md:w-5/12 md:px-4">
          <div className="flex flex-col items-center justify-center my-12 gap-y-6">
            <small>socials</small>
            <div className="flex items-center justify-center space-x-1">
              <Link
                href={siteConfig.links.facebook}
                target="_blank"
                rel="noreferrer"
              >
                <div
                  className={buttonVariants({
                    size: "icon",
                    variant: "ghost",
                  })}
                >
                  <Icons.facebook
                    className="w-5 h-5 fill-current"
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
                    size: "icon",
                    variant: "ghost",
                  })}
                >
                  <Icons.instagram className="w-5 h-5" strokeWidth="1.5" />
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
                    size: "icon",
                    variant: "ghost",
                  })}
                >
                  <Icons.twitch className="w-5 h-5" strokeWidth="1.5" />
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
                    size: "icon",
                    variant: "ghost",
                  })}
                >
                  <Icons.twitter
                    className="w-5 h-5 fill-current"
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
                    size: "icon",
                    variant: "ghost",
                  })}
                >
                  <Icons.youtube className="w-5 h-5" strokeWidth="1.5" />
                  <span className="sr-only">YouTube</span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-between p-4 border-t md:py-0 md:ps-0 md:flex-row border-stone-400 dark:border-stone-600">
        <ThemeToggle />
        <small>
          &copy;{new Date().getFullYear()} CrankCommunism, all rights reserved
        </small>
      </div>
    </footer>
  );
}
