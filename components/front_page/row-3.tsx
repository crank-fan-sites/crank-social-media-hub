import type { NextPage } from "next";

import { useRouter } from "next/router";

import { Button } from "@/components/ui/button";
import {
  HeadingH1,
  HeadingH2,
  HeadingH3,
  Paragraph,
} from "@/components/typography";

import TwitterProfile from "@/components/front_page/twitter-profile";

import SoundCloudPlayer from "./soundcloud";

const Row1: NextPage = () => {
  const router = useRouter();

  return (
    <div className="grid grid-cols-1 border-t bg-primary lg:grid-cols-2 border-stone-400 dark:border-stone-600">
      <div className="px-2 py-6 border-b group md:p-8 lg:p-12 border-stone-400 dark:border-stone-600 md:border-b-0 md:border-r hover:bg-scanlines hover:bg-accent">
        <TwitterProfile />
      </div>

      <div className="px-2 py-6 group md:p-8 lg:p-12 hover:bg-scanlines hover:bg-accent">
        <HeadingH3 className="text-base group-hover:text-background group-hover:font-bold">
          Featured Songs
        </HeadingH3>
        <SoundCloudPlayer trackUrl="https://soundcloud.com/dj-tom-hanks/werepyres-are-coming-down-the-mountain-pt-2" />
      </div>
    </div>
  );
};

export default Row1;
