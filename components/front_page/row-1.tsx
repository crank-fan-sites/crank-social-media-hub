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
      <div className="grid bg-primary grid-cols-1 lg:grid-cols-3 border-t border-stone-400 dark:border-stone-600">
        <div className="group py-6 px-2 md:p-8 lg:p-12 border-b border-stone-400 dark:border-stone-600 md:border-b-0 md:border-r hover:bg-scanlines hover:bg-accent">
          <HeadingH1 className="text-base group-hover:text-background group-hover:font-bold">
            Tiktok Profile
          </HeadingH1>
          <TiktokProfile />
        </div>

        <div className="group py-6 px-2 md:p-8 lg:p-1 border-b border-stone-400 dark:border-stone-600 md:border-b-0 md:border-r hover:bg-scanlines hover:bg-accent">
          <HeadingH2 className="text-base group-hover:text-background group-hover:font-bold">
            Latest Tiktok Video
          </HeadingH2>
          <TiktokVideo />
        </div>

        <div className="group py-6 px-2 md:p-8 lg:p-12 hover:bg-scanlines hover:bg-accent relative">
          <HeadingH2 className="text-base group-hover:text-background group-hover:font-bold">
            Connect with Buddyhead
          </HeadingH2>
          <div className="relative w-full h-full">
            <Image
              alt="duck"
              src="/screenshots/UnelectableAirwaves-road-war-2.png"
              layout="fill"
              objectFit="cover" // Adjust how the image fits within its container
              className="mt-6"
            />
          </div>
          Join the revolution
        </div>
      </div>
    </>
  );
};

export default Row1;
