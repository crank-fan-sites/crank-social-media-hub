/* eslint-disable @next/next/no-img-element */
import type { NextPage } from "next";
import Head from "next/head";

import { useEffect } from "react";
import { useRouter } from "next/router";
import { MainLayout } from "@/layouts/layout";
import { Button } from "@/components/ui/button";
import TwitchEmbed from "@/components/twitch-player";
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

import Row1 from "@/components/front_page/row-1";

const Home: NextPage = () => {
  const router = useRouter();
  const api = useAxios();
  // useEffect(() => {
  //   const renderData = async () => {
  //     try {
  //       const response = await api.get(`${url}/pages`);
  //       console.log('response', response);
  //       return response;
  //     } catch (error: any) {
  //       console.log('error', error);
  //     }
  //   };
  //   renderData();
  // }, []);
  return (
    <MainLayout>
      {/* TODO: add head */}
      {/* TODO: refactor Homepage into Dynamic Zones */}
      <div>
        <div className="relative bg-accent -z-20 before:block before:absolute before:inset-0 before:bg-scanlines before:-z-10">
          <HeadingH1 className="fixed top-0 left-0 -indent-[500%] overflow-hidden bg-wordmark bg-no-repeat bg-center bg-[length:90%_auto] 2xl:bg-[length:1400px_auto] w-full h-[540px] -z-10">
            buddyhead
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

        <div className="grid bg-primary place-items-center pb-12 grid-cols-1 xl:grid-cols-2">
          <div className="p-4 w-full h-full grid place-items-center">
            <TwitchEmbed height={360} width={760} />
          </div>

          <div className="ml-20 pl-2 py-4 px-1 md:p-4 lg:p-4 lg:pl-0">
            <HeadingH2>Yep, Buddyhead is back.</HeadingH2>
            <Paragraph className="max-w-[48ch]">
              This webzine was established in 1998 so it&lsquo;s kind of poetic
              for it to reappear on its 25th anniversary. The focus of the site
              is and has also been to shed light on things that normally
              wouldn&lsquo;t get the attention they deserve. That includes
              music, politics, films, art or whatever else that excites us.
            </Paragraph>
            <Paragraph className="font-bold max-w-[48ch]">
              We are currently{" "}
              <Link href="/dashboard">accepting applications</Link> for
              designers, writers and content creators who share this vision and
              would like to contribute to this project.
            </Paragraph>
            {/* <Button>Default Button</Button>
            <Button variant="destructive">Destructive Button</Button>
            <Button variant="outline">Outline Button</Button>
            <Button variant="secondary">Secondary Button</Button>
            <Button variant="ghost">Ghost Button</Button>
            <Button variant="link">Link</Button> */}
          </div>
        </div>

        <div className="grid bg-primary grid-cols-1 md:grid-cols-2 border-t border-stone-400 dark:border-stone-600">
          <div className="group py-6 px-2 md:p-8 lg:p-12 border-b border-stone-400 dark:border-stone-600 md:border-b-0 md:border-r hover:bg-scanlines hover:bg-accent">
            <HeadingH3 className="text-base group-hover:text-background group-hover:font-bold">
              Latest YouTube Video
            </HeadingH3>
            <YT />
          </div>

          <div className="group py-6 px-2 md:p-8 lg:p-12 hover:bg-scanlines hover:bg-accent">
            <HeadingH3 className="text-base group-hover:text-background group-hover:font-bold">
              Highlighted YouTube Playlist
            </HeadingH3>
            <Paragraph className="group-hover:text-background group-hover:font-bold">
              Playlist here
            </Paragraph>
            <Button
              className="p-0 group-hover:text-background group-hover:italic hover:font-bold"
              variant="link"
              onClick={() => router.push("/contact")}
            >
              Join the revolution
            </Button>
          </div>
        </div>

        <Row1 />
        <Row1 />
        <Row1 />
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
