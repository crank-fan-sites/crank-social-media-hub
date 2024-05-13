import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Red_Hat_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";

const redHatMono = Red_Hat_Mono({
  subsets: ["latin"],
  display: "swap",
});

export function MainLayout({ children, ...props }: any) {
  return (
    <div className={`${redHatMono.className}`}>
      <div className="container border-l border-r border-stone-400 dark:border-stone-6000">
        <SiteHeader title={props.title} headerLinks={props.headerLinks} />
        <main>{children}</main>
        <Analytics />
        <SiteFooter title={props.title} footerLinks={props.footerLinks} />
      </div>
    </div>
  );
}
