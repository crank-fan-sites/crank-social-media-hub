export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "CrankCommunism",
  description: "the description",
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Blog",
      href: "/blog",
    },
    {
      title: "Third",
      href: "/third",
    },
    {
      title: "Contact",
      href: "/contact",
    },
    {
      title: "Others",
      href: "/",
      external: true,
      target: "_blank",
    },
  ],
  links: {
    facebook: "http://facebook.com/UnelectableAirwaves",
    instagram: "https://instagram.com/djtomhanks",
    twitch: "https://www.twitch.tv/UnelectableAirwaves",
    twitter: "https://twitter.com/djtomhanks",
    youtube: "https://www.youtube.com/@UnelectableAirwaves",
  },
};
