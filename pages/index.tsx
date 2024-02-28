/* eslint-disable @next/next/no-img-element */
import type { NextPage } from "next";
import Head from "next/head";

import { useEffect } from "react";
import { useRouter } from "next/router";

import { TwitchPlayer, TwitchChat } from "react-twitch-embed";

import { MainLayout } from "@/layouts/layout";
import { Button } from "@/components/ui/button";

import TwitchEmbed from "@/components/twitch-player";
import TwitchChatBox from "@/components/twitch-chat";
import Reddit from "@/components/front_page/reddit";
import Patreon from "@/components/front_page/patreon";

import Link from "next/link";
import {
  HeadingH1,
  HeadingH2,
  HeadingH3,
  Paragraph,
} from "@/components/typography";
import { Icons } from "@/components/icons";
import Image from "next/image";
import heroImgPortrait from "@/public/images/hero-portrait.png";
import heroImgLandscape from "@/public/images/hero-landscape.png";
import useAxios from "@/axios";

import YT from "@/components/front_page/youtube";
import YoutubePlaylist from "@/components/front_page/youtube-playlist";

import Row1 from "@/components/front_page/row-1";
import Row2 from "@/components/front_page/row-2";
import Row3 from "@/components/front_page/row-3";
import Row4 from "@/components/front_page/row-4";

const Home: NextPage = () => {
  const router = useRouter();
  const api = useAxios();

  return (
    <MainLayout>
      <div>
        <div className="relative bg-accent -z-20 before:block before:absolute before:inset-0 before:bg-scanlines before:-z-10">
          <HeadingH1 className="fixed top-0 left-0 -indent-[500%] overflow-hidden bg-wordmark bg-no-repeat bg-center bg-[length:90%_auto] 2xl:bg-[length:1400px_auto] w-full h-[540px] -z-10">
            Crank Communism
          </HeadingH1>

          <Image
            src="/images/hero-landscape.png"
            alt=""
            height={856}
            width={2295}
            className="w-full h-[428px] object-cover relative -z-40 mix-blend-luminosity"
            quality={10}
          />
        </div>

        <div className="grid bg-primary place-items-center py-12 grid-cols-1 border-t border-stone-400 dark:border-stone-600">
          <small>haha oh hell yeah</small>
          <Icons.skull className="h-6 w-6 m-2 opacity-80" strokeWidth="1.5" />
        </div>

        <div className="grid bg-primary place-items-center pb-12 grid-cols-1 2xl:grid-cols-2">
          <div className="p-1 w-full h-full grid place-items-center">
            <div className="twitch-video-container">
              <TwitchEmbed height={480} width={960} />
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="grid bg-primary grid-cols-1 lg:grid-cols-2 border-t border-stone-400 dark:border-stone-600">
            <div className="group py-6 px-2 md:p-2 lg:p-4 border-b border-stone-400 dark:border-stone-600 md:border-b-0 md:border-r hover:bg-scanlines hover:bg-accent">
              <div className="ml-20 pl-2 py-4 px-1 md:p-4 lg:p-4 lg:pl-0">
                <HeadingH2 className="text-base group-hover:text-background group-hover:font-bold">
                  Highlighted Twitch Clips
                </HeadingH2>
                <div className="twitch-player-container">
                  <TwitchPlayer
                    // channel="unelectableairwaves"
                    collection="Fx6m6WjAdhfwig"
                    autoplay={false}
                    muted
                    width={540}
                    height={480}
                  />
                </div>
              </div>
            </div>
            <div className="group py-6 px-2 md:p-8 lg:p-12 hover:bg-scanlines hover:bg-accent">
              <HeadingH3 className="text-base group-hover:text-background group-hover:font-bold">
                About Crankiness
              </HeadingH3>
              Imagine that you are in my shoes, that you are experiencing this.
              Then in the end you are portrayed as problematic, pushed out, the
              project you invested 3 years in is practically stolen from you.
              Yes, it seems like an extremely black and white situation to me. I
              have never experienced anything so unfair, I had the feeling that
              I was so badly played, taken advantage of. And no, the fact that I
              can't see my mistakes is not true at all. I usually have a problem
              with this, that I give in too quickly, because I immediately find
              fault with myself, I start drowning in a bad conscience. That's
              kind of my default response.
            </div>
          </div>

          <div className="grid bg-primary grid-cols-1 lg:grid-cols-2 border-t border-stone-400 dark:border-stone-600">
            <div className="group py-6 px-2 md:p-2 lg:p-4 border-b border-stone-400 dark:border-stone-600 md:border-b-0 md:border-r hover:bg-scanlines hover:bg-accent">
              <HeadingH3 className="text-base group-hover:text-background group-hover:font-bold">
                Latest YouTube Video
              </HeadingH3>
              {/* <div className="youtube-embed-overlap"> */}
              <div className="youtube-video-container">
                <YT />
              </div>
              <Button
                className="p-0 group-hover:text-background group-hover:italic hover:font-bold"
                variant="link"
                onClick={() => router.push("/contact")}
              >
                Go to YouTube
              </Button>
            </div>

            <div className="group py-6 px-2 md:p-8 lg:p-12 hover:bg-scanlines hover:bg-accent">
              <HeadingH3 className="text-base group-hover:text-background group-hover:font-bold">
                Highlighted YouTube Playlist
              </HeadingH3>
              <div className="youtube-video-container">
                <YoutubePlaylist />
              </div>
              <Button
                className="p-0 group-hover:text-background group-hover:italic hover:font-bold"
                variant="link"
                onClick={() => router.push("/contact")}
              >
                Go to YouTube
              </Button>
            </div>
          </div>

          <Row1 />
          <Row3 />
          <Row2 />
          <Row4 />

          <div className="grid bg-primary grid-cols-1 lg:grid-cols-2 border-t border-stone-400 dark:border-stone-600">
            <div className="group py-6 px-2 md:p-2 lg:p-4 border-b border-stone-400 dark:border-stone-600 md:border-b-0 md:border-r hover:bg-scanlines hover:bg-accent">
              <HeadingH3 className="text-base group-hover:text-background group-hover:font-bold">
                Latest Patreon Post
              </HeadingH3>
              {/* <div className="youtube-embed-overlap"> */}
              <div className="patreon-container">
                <Patreon postUrl="https://www.patreon.com/posts/aaron-good-uncut-96137431?utm_medium=clipboard_copy&utm_source=copyLink&utm_campaign=postshare_fan&utm_content=join_link" />
              </div>
              <Button
                className="p-0 group-hover:text-background group-hover:italic hover:font-bold"
                variant="link"
                onClick={() => router.push("/contact")}
              >
                Go to YouTube
              </Button>
            </div>

            <div className="group py-6 px-2 md:p-8 lg:p-12 hover:bg-scanlines hover:bg-accent">
              <HeadingH3 className="text-base group-hover:text-background group-hover:font-bold">
                Highlighted YouTube Playlist
              </HeadingH3>
              <div className="youtube-video-container">
                <YoutubePlaylist />
              </div>
              <Button
                className="p-0 group-hover:text-background group-hover:italic hover:font-bold"
                variant="link"
                onClick={() => router.push("/contact")}
              >
                Go to YouTube
              </Button>
            </div>
          </div>

          <div className="grid bg-primary grid-cols-1 border-t border-stone-400 dark:border-stone-600">
            <div className="group py-6 px-2 md:p-8 lg:p-12 border-b border-stone-400 dark:border-stone-600 md:border-b-0 md:border-r hover:bg-scanlines hover:bg-accent">
              <HeadingH3 className="text-base group-hover:text-background group-hover:font-bold">
                Recent Reddit Posts
              </HeadingH3>
              <div className="grid bg-primary grid-cols-1 border-t border-stone-400 dark:border-stone-600">
                <Reddit />
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Home;

// use
{
  /*
<HeadingH1>what up</HeadingH1>
<HeadingH2>what up</HeadingH2>
<HeadingH3>what up</HeadingH3>
<HeadingH4>what up</HeadingH4>
<HeadingH5>what up</HeadingH5>
<Paragraph>what up</Paragraph>
<TypographyLarge>TypographyLarge</TypographyLarge>
<TypographySmall>small</TypographySmall>
<TypographyMuted>small</TypographyMuted>
<Button variant="outline">Button</Button>
*/
}
