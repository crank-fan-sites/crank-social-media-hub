import type { NextPage } from "next";

import { useRouter } from "next/router";

import Image from "next/image";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";
import {
  HeadingH1,
  HeadingH2,
  HeadingH3,
  Paragraph,
} from "@/components/typography";

import TiktokVideo from "@/components/front_page/tiktok-video";
import TiktokProfile from "@/components/front_page/tiktok-profile";

const Row1: NextPage = () => {
  const router = useRouter();

  return (
    <>
      <div className="grid grid-cols-1 border-t bg-primary lg:grid-cols-2 border-stone-400 dark:border-stone-600">
        <div className="px-2 py-6 border-b group md:p-8 lg:p-12 border-stone-400 dark:border-stone-600 md:border-b-0 hover:bg-scanlines">
          <HeadingH1 className="text-base group-hover:font-bold">
            Tiktok Profile
          </HeadingH1>
          <TiktokProfile />
        </div>

        <div className="px-2 py-6 border-b group md:p-8 lg:p-1 border-stone-400 dark:border-stone-600 md:border-b-0 md:border-r hover:bg-scanlines">
          <HeadingH2 className="text-base group-hover:font-bold">
            Featured Tiktok Video
          </HeadingH2>
          <TiktokVideo />
        </div>
      </div>
    </>
  );
};

export default Row1;
