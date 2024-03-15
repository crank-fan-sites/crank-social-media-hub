/* eslint-disable @next/next/no-img-element */
import type { NextPage } from "next";
import Head from "next/head";

import { useEffect } from "react";
import { useRouter } from "next/router";

import { MainLayout } from "@/layouts/layout";
import { Button } from "@/components/ui/button";

import RowTopSection from "@/components/front_page/row-top-section";

import Link from "next/link";
import {
  HeadingH1,
  HeadingH2,
  HeadingH3,
  Paragraph,
} from "@/components/typography";
import { Icons } from "@/components/icons";
import Image from "next/image";

import RowTwitchAndImage from "@/components/front_page/row-twitch-and-image";
import RowYt from "@/components/front_page/row-yt";
import RowTiktok from "@/components/front_page/row-tiktok";
import RowTwitterSoundcloud from "@/components/front_page/row-twitter-soundcloud";
import RowPatreon from "@/components/front_page/row-patreon";
import RowDiscord from "@/components/front_page/row-discord";
import RowReddit from "@/components/front_page/row-reddit";
import RowInstagram from "@/components/front_page/row-instagram";

const Home: NextPage = () => {
  const router = useRouter();

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

        <RowTopSection />

        {/* content */}
        <div className="mx-auto max-w-7xl">
          <RowTwitchAndImage />
          {/* end one row */}
          {/* content after top header parts */}
          <RowYt />
          {/* end one row */}
          <RowTiktok />
          {/* end one row */}
          <RowTwitterSoundcloud />
          {/* end one row */}
          <RowDiscord />
          {/* end one row */}
          <RowPatreon />
          {/* end one row */}
          <RowReddit />
          {/* end one row */}
          <RowInstagram />
          {/* end one row */}
        </div>
        {/* end .max-w-7xl.mx-auto */}
      </div>
      {/* overall one */}
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
