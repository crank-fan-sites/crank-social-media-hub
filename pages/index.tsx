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

const Home: NextPage = (props) => {
  return (
    <MainLayout>
      <div>
        <div className="relative -z-20 before:block before:absolute before:inset-0 before:bg-scanlines before:-z-10">
          <Image
            src="/screenshots/UnelectableAirwaves_banner-title-2-thin.png"
            alt=""
            height={856}
            width={2295}
            className="w-full h-[428px] object-cover relative -z-40 mix-blend-luminosity"
            quality={10}
          />
        </div>

        <RowTwitchPlayer />

        {/* content */}
        <div className="mx-auto max-w-7xl">
          <RowTwitchAndImage />
          {/* end one row */}
          {/* content after top header parts */}
          <RowYt />
          {/* end one row */}
          <RowTiktok
            profile={props.tiktok.profile}
            videoCreator={props.tiktok.videoCreator}
            videoId={props.tiktok.videoId}
          />
          {/* end one row */}
          <RowTwitterSoundcloud />
          {/* end one row */}
          <RowDiscord
            name={props.discord.name}
            widget={props.discord.widget}
            messages={props.discord.messages}
          />
          {/* end one row */}
          <RowPatreon posts={props.patreon.posts} />
          {/* end one row */}
          <RowReddit data={props.reddit.posts} />
          {/* end one row */}
          <RowInstagram data={props.instagram} />
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
  // Get base url for Next.JS api calls. Same base url
  const { req } = context;
  const protocol = req.headers["x-forwarded-proto"] || "http";
  const host = req.headers.host;
  const baseUrl = `${protocol}://${host}`;

  let result = null;
  try {
    const url = "/front-page?populate=*";
    result = await getStrapi(url);
  } catch (error) {
    console.log("grab error", error);
    return false;
  }

  const {
    discord,
    instagram,
    patreon,
    reddit,
    tiktok,
  } = result;

  // Instagram
  const igResponse = await fetch(
    baseUrl + "/api/instagram/media" + "?token=" + instagram.api_access_token
  );
  if (!igResponse.ok) {
    // throw new Error("Network response was not ok");
    console.log("bad IG");
  }
  const igMedia = await igResponse.json();

  // Discord
  const discordMessages = await fetch(
    baseUrl + "/api/discord/messages" + "?channelId=" + discord.channel_id
  )
    .then((response) => response.json())
    .catch((error) => console.error("Failed to load Discord messages", error));

  // Patreon
  const patreonResponse = await fetch(
    baseUrl +
      "/api/patreon/posts" +
      "?campaignId=" +
      patreon.campaign_id +
      "&accessToken=" +
      patreon.access_token
  );
  if (!patreonResponse.ok) {
    throw new Error("Network response was not ok");
  }
  const patreonPostsResponse = await patreonResponse.json();
  const patreonPosts = patreonPostsResponse.data;

  // Reddit
  const redditResponse = await fetch(
    baseUrl + "/api/reddit/posts" + "?subreddit=" + reddit.subreddit
  );
  if (!redditResponse.ok) {
    throw new Error("Network response was not ok");
  }
  const redditPosts = await redditResponse.json();

  // Tiktok
  const tiktokObj = {
    profile: tiktok.profile,
    videoCreator: tiktok.video_creator,
    videoId: tiktok.video_id,
  };
  // Props
  return {
    props: {
      discord: {
        name: discord.channel_name,
        widget: discord.widget_url,
        messages: discordMessages,
      },
      instagram: { media: igMedia },
      patreon: { posts: patreonPosts },
      reddit: { posts: redditPosts },
    },
  };
};

export default Home;
