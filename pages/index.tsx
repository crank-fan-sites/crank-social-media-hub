/* eslint-disable @next/next/no-img-element */
import type { NextPage } from "next";
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
          {/* <Facebook /> */}
        </div>
        {/* end .max-w-7xl.mx-auto */}
      </div>
      {/* overall one */}
    </MainLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  // Fetch data here and pass it to the page via props
  // Example: const data = await fetchData();
  return {
    props: {}, // Pass data here
  };
};

export default Home;
