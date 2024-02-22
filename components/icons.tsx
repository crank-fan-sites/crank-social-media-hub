/* eslint-disable @next/next/no-img-element */
import {
  LucideProps,
  Moon,
  SunMedium,
  Twitter,
  Instagram,
  Facebook,
  Twitch,
  Youtube,
  Skull,
  ArrowUpRight,
  Menu,
  // @ts-ignore
  type Icon as LucideIcon,
} from 'lucide-react';
// import logoPink from '@/public/images/logo-pink.png';
// import logoWhite from '@/public/images/logo-white.png';
// const url = 'https://buddyhead-app-xvgeb.ondigitalocean.app';
const logoWhite = `https://cdn.shopify.com/s/files/1/0714/9164/9842/files/CFC46F21-8CCD-41BE-BA07-FDE6497C9213.png?v=1698693449`;
// const logoPink = `https://live.staticflickr.com/65535/53230455709_e7c7cf46ec_k.jpg`;

export type Icon = LucideIcon;

export const Icons = {
  sun: SunMedium,
  moon: Moon,
  twitter: Twitter,
  instagram: Instagram,
  facebook: Facebook,
  twitch: Twitch,
  youtube: Youtube,
  skull: Skull,
  arrowUpRight: ArrowUpRight,
  menu: Menu,
  logo: (props: any) => (
    <img src={logoWhite} width={100} alt="logo white" {...props} />
  ),
  logoPink: (props: any) => (
    <img src="/images/logo-pink.png" width={100} alt="logo pink" {...props} />
  ),
};
