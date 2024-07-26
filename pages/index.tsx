/* eslint-disable @next/next/no-img-element */
import type { NextPage, GetStaticProps } from "next";
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
// import FourthwallRow from "@/components/front_page/row-fourthwall";
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

        {/* {props.fourthwall && <FourthwallRow {...props.fourthwall} />} */}

        <RowTwitchPlayer channel={props.twitch.channel} />
        {/* content */}
        <div className="mx-auto max-w-7xl">
          {/* <RowTwitchAndImage
            highlighted={props.twitch.highlighted}
            buttons={props.twitch.buttons}
            sideImage={props.twitch.sideImage}
          /> */}
          {/* end one row */}
          {/* content after top header parts */}
          <RowYt
            videos={props.youtube.videos}
            stats={props.youtube.stats}
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
            sideImage={props.discord.sideImage}
          />
          {/* end one row */}
          <RowPatreon
            posts={props.patreon.posts}
            buttons={props.patreon.buttons}
            sideImage={props.patreon.sideImage}
          />
          {/* end one row */}
          <RowReddit
            subreddit={props.reddit.subreddit}
            data={props.reddit.posts}
            buttons={props.reddit.buttons}
          />
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

export const getStaticProps: GetStaticProps = async () => {
  // CONFIG
  const SiteConfigObj = await siteConfig();

  // LINKS -- Header and footer links
  const { headerLinks, footerLinks } = await siteLinks();

  // INTEGRATIONS

  // Get base url for Next.JS api calls. Same base url
  // const baseUrl = getBaseUrl(context.req);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

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
    // fourthwall,
  } = result;

  // Instagram
  const igMedia = await fetchInstagramMedia(
    baseUrl,
    instagram.api_access_token,
    instagram.last_updated
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
    patreon.access_token,
    patreon.last_updated
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
  const twitchObj = twitchObject(twitch);

  // Twitter
  const twitterObj = {
    profile: twitter.profile,
    darkMode: twitter.dark_mode,
    height: twitter.widget_height,
    buttons: twitter.buttonLink,
  };

  // Youtube

  // youtube.channel_id;
  const youtubeApiKey = process.env.NEXT_PUBLIC_YT_API_KEY;

  // do try catch
  const ytChannelUrl = `https://www.googleapis.com/youtube/v3/channels?part=statistics,contentDetails&forHandle=${"@HasansProducer"}&key=${youtubeApiKey}`;
  const ytChannelResponse = await fetch(ytChannelUrl);
  const ytChannelData = await ytChannelResponse.json();
  const uploadsPlaylist =
    ytChannelData.items[0].contentDetails.relatedPlaylists.uploads;

  const ytStatistics = ytChannelData.items[0].statistics;
  const ytStats = {
    views: ytStatistics.viewCount,
    subs: ytStatistics.subscriberCount,
    count: ytStatistics.videoCount,
  };
  // console.log(uploadsPlaylist);
  // console.log(ytStats);

  // do try catch
  // check to see if the video is public to include it
  const ytUploadsUrl = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails,status&playlistId=${uploadsPlaylist}&key=${youtubeApiKey}`;
  const ytUploadsResponse = await fetch(ytUploadsUrl);
  const ytUploadsData = await ytUploadsResponse.json();
  // do try catch if sepearate from above

  const ytVideos = ytUploadsData.items.map((item) => {
    if (item.status.privacyStatus === "public") {
      return {
        publishedAt: item.snippet.publishedAt,
        title: item.snippet.title,
        thumbnail: item.snippet.thumbnails.medium.url,
        description: item.snippet.description,
        url: `https://youtube.com/embed/${item.contentDetails.videoId}?controls=0&showinfo=0&rel=0`,
      };
    }
  });

  // Patreon
  const patreonImageObj = patreonSideImage(patreon);

  // Props
  return {
    props: {
      siteConfig: { ...SiteConfigObj },

      discord: discordObject(discord, discordMessages),
      instagram: { media: igMedia, buttons: instagram.buttonLink },
      patreon: {
        posts: patreonPosts,
        buttons: patreon.buttonLink,
        sideImage: patreonImageObj,
      },
      reddit: {
        subreddit: reddit.subreddit,
        posts: redditPosts,
        buttons: reddit.buttonLink,
      },
      tiktok: { ...tiktokObj },
      twitch: { ...twitchObj },
      twitter: twitterObj,
      youtube: {
        videos: ytVideos,
        stats: ytStats,
        buttons: youtube.buttonLink,
      },
      soundcloud: { tracks: soundcloud },

      // fourthwall: fourthWallObj,

      headerLinks,
      footerLinks,
    },
    revalidate: 60 * 10, // 10 minutes
  };
};

const patreonSideImage = (patreon: any) => {
  const { sideImage } = patreon;
  if (sideImage && sideImage.data && sideImage.data.attributes) {
    const { alternativeText, caption, url, width, height } =
      sideImage.data.attributes;
    return {
      url,
      alternativeText,
      caption,
      width,
      height,
    };
  } else {
    return null; // Return null if sideImage or its nested properties do not exist
  }
};

const twitchObject = (twitch: any) => {
  const { channel_handle, highlighted_playlist, buttonLink, sideImage } =
    twitch;
  if (sideImage && sideImage.data && sideImage.data.attributes) {
    const { alternativeText, caption, url, width, height } =
      sideImage.data.attributes;
    return {
      channel: channel_handle,
      highlighted: highlighted_playlist,
      buttons: buttonLink,
      sideImage: {
        url,
        alternativeText,
        caption,
        width,
        height,
      },
    };
  } else {
    return {
      channel: channel_handle,
      highlighted: highlighted_playlist,
      buttons: buttonLink,
      sideImage: null,
    };
  }
};

const discordObject = (discord: any, messages) => {
  const { channel_name, widget_url, buttonLink, sideImage } = discord;
  if (sideImage && sideImage.data && sideImage.data.attributes) {
    const { alternativeText, caption, url, width, height } =
      sideImage.data.attributes;
    return {
      name: channel_name,
      widget: widget_url,
      buttons: buttonLink,
      messages,
      sideImage: {
        url,
        alternativeText,
        caption,
        width,
        height,
      },
    };
  } else {
    return {
      name: channel_name,
      widget: widget_url,
      buttons: buttonLink,
      messages,
      sideImage: null,
    };
  }
};

export default Home;
