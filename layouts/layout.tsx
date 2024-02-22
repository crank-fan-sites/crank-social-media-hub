import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { Red_Hat_Mono } from 'next/font/google';

const redHatMono = Red_Hat_Mono({
  subsets: ['latin'],
  display: 'swap',
});

export function MainLayout({ children, ...props }: any) {
  return (
    <div {...props} className={`${redHatMono.className}`}>
      <div className="container border-l border-r border-stone-400 dark:border-stone-600">
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </div>
    </div>
  );
}
