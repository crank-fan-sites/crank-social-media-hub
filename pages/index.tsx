/* eslint-disable @next/next/no-img-element */
import type { NextPage, GetServerSideProps } from "next";
import Head from "next/head";

import { MainLayout } from "@/layouts/layout";
import { Button } from "@/components/ui/button";

import Link from "next/link";
import {
  HeadingH1,
  HeadingH2,
  HeadingH3,
  Paragraph,
} from "@/components/typography";
import { Icons } from "@/components/icons";
import Image from "next/image";

import RowTwitchPlayer from "@/components/front_page/row-twitch-player";
import RowTwitchAndImage from "@/components/front_page/row-twitch-and-image";
import RowYt from "@/components/front_page/row-yt";
import RowTiktok from "@/components/front_page/row-tiktok";
import RowTwitterSoundcloud from "@/components/front_page/row-twitter-soundcloud";
import RowPatreon from "@/components/front_page/row-patreon";
import RowDiscord from "@/components/front_page/row-discord";
import RowReddit from "@/components/front_page/row-reddit";
import RowInstagram from "@/components/front_page/row-instagram";
// import Facebook from "@/components/front_page/facebook";

import { getStrapi } from "@/lib/getStrapi";
import { siteConfig, siteLinks, getBaseUrl } from "@/lib/SSRLayout";
import {
  fetchInstagramMedia,
  fetchDiscordMessages,
  fetchPatreonPosts,
  fetchRedditPosts,
} from "@/lib/socialMediaIntegrations";

const Home: NextPage = (props) => {
  return (
    <MainLayout
      headerLinks={props.headerLinks}
      footerLinks={props.footerLinks}
      title={props.siteConfig.title}
    >
      <div>
        <div className="relative -z-20 before:block before:absolute before:inset-0 before:bg-scanlines before:-z-10">
          <Image
            src={props.siteConfig.bannerImage.url}
            alt={props.siteConfig.bannerImage.alternativeText}
            height={856}
            width={2295}
            className="w-full h-[428px] object-cover relative -z-40 mix-blend-luminosity"
            quality={10}
          />
        </div>

        {props.siteConfig.description && (
          <div
            className="grid grid-cols-1 p-5 border-t bg-primary place-items-center border-stone-400 dark:border-stone-600"
            dangerouslySetInnerHTML={{ __html: props.siteConfig.description }}
          ></div>
        )}
        <RowTwitchPlayer channel={props.twitch.channel} />
        {/* content */}
        <div className="mx-auto max-w-7xl">
          <RowTwitchAndImage
            highlighted={props.twitch.highlighted}
            buttons={props.twitch.buttons}
          />
          {/* end one row */}
          {/* content after top header parts */}
          <RowYt
            channel={props.youtube.channel}
            playlistId={props.youtube.playlistId}
            buttons={props.youtube.buttons}
          />
          {/* end one row */}
          <RowTiktok
            profile={props.tiktok.profile}
            videoCreator={props.tiktok.videoCreator}
            videoId={props.tiktok.videoId}
          />
          {/* end one row */}
          <RowTwitterSoundcloud
            twitterProfile={props.twitter.profile}
            darkMode={props.twitter.darkMode}
            height={props.twitter.height}
            tracks={props.soundcloud.tracks}
          />
          {/* end one row */}
          <RowDiscord
            name={props.discord.name}
            widget={props.discord.widget}
            messages={props.discord.messages}
            buttons={props.discord.buttons}
          />
          {/* end one row */}
          <RowPatreon
            posts={props.patreon.posts}
            buttons={props.patreon.buttons}
          />
          {/* end one row */}
          <RowReddit data={props.reddit.posts} buttons={props.reddit.buttons} />
          {/* end one row */}
          <RowInstagram
            data={props.instagram.media}
            buttons={props.instagram.buttons}
          />
          {/* end one row */}
          {/* <Facebook /> */}
        </div>
        {/* end .max-w-7xl.mx-auto */}
      </div>
      {/* overall one */}
    </MainLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  // CONFIG
  const SiteConfigObj = await siteConfig();

  // LINKS -- Header and footer links
  const { headerLinks, footerLinks } = await siteLinks();

  // INTEGRATIONS

  // Get base url for Next.JS api calls. Same base url
  const baseUrl = getBaseUrl(context.req);

  let result = null;
  try {
    const url = "/front-page?populate=deep";
    result = await getStrapi(url);
  } catch (error) {
    console.error("front-page grab error", error);
    return {
      props: {
        siteConfig: { ...SiteConfigObj },
        headerLinks,
        footerLinks,
      },
      notFound: true,
    };
  }

  const {
    discord,
    instagram,
    patreon,
    reddit,
    tiktok,
    twitch,
    twitter,
    youtube,
    soundcloud,
  } = result;

  // Instagram
  const igMedia = await fetchInstagramMedia(
    baseUrl,
    instagram.api_access_token
  );

  // Discord
  const discordMessages = await fetchDiscordMessages(
    baseUrl,
    discord.channel_id
  );

  // Patreon
  const patreonPosts = await fetchPatreonPosts(
    baseUrl,
    patreon.campaign_id,
    patreon.access_token
  );

  // Reddit
  const redditPosts = await fetchRedditPosts(baseUrl, reddit.subreddit);

  // Tiktok
  const tiktokObj = tiktok
    ? {
        profile: tiktok.profile,
        videoCreator: tiktok.video_creator,
        videoId: tiktok.video_id,
        buttons: tiktok.buttonLink,
      }
    : {
        profile: null,
        videoCreator: null,
        videoId: null,
        buttons: [],
      };

  // Twitch
  const twitchObj = {
    channel: twitch.channel_handle,
    highlighted: twitch.highlighted_playlist,
    buttons: twitch.buttonLink,
  };

  // Twitter
  const twitterObj = {
    profile: twitter.profile,
    darkMode: twitter.dark_mode,
    height: twitter.widget_height,
  };

  // Youtube
  const youtubeObj = {
    channel: youtube.channel_id,
    playlistId: youtube.playlist_id,
  };

  // Props
  return {
    props: {
      siteConfig: { ...SiteConfigObj },

      discord: {
        name: discord.channel_name,
        widget: discord.widget_url,
        messages: discordMessages,
        buttons: discord.buttonLink,
      },
      instagram: { media: igMedia, buttons: instagram.buttonLink },
      patreon: { posts: patreonPosts, buttons: patreon.buttonLink },
      reddit: { posts: redditPosts, buttons: reddit.buttonLink },
      tiktok: { ...tiktokObj },
      twitch: { ...twitchObj, buttons: twitch.buttonLink },
      twitter: { ...twitterObj, buttons: twitter.buttonLink },
      youtube: { ...youtubeObj, buttons: youtube.buttonLink },
      soundcloud: { tracks: soundcloud },

      headerLinks,
      footerLinks,
    },
  };
};

export default Home;
