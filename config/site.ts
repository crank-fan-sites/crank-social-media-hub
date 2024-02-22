export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: 'BuddyHead',
  description: 'haha oh hell yeah',
  mainNav: [
    {
      title: 'Home',
      href: '/',
    },
    {
      title: 'Zine',
      href: '/blog',
    },
    {
      title: 'Label',
      href: '/label',
    },
    {
      title: 'Contact',
      href: '/contact',
    },
    {
      title: 'Merch',
      href: 'https://buddyheadstore.myshopify.com/',
      external: true,
      target: '_blank',
    },
  ],
  links: {
    facebook: 'http://facebook.com/Buddyhead420',
    instagram: 'https://instagram.com/buddyhead_',
    twitch: 'https://www.twitch.tv/buddyhead',
    twitter: 'https://twitter.com/buddyhead',
    youtube: 'https://www.youtube.com/@BUDDYHEAD',
  },
};
