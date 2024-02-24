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
import TwitterLikes from "@/components/front_page/twitter-likes";
import TwitterButtons from "@/components/front_page/twitter-buttons";

const Row1: NextPage = () => {
  const router = useRouter();

  return (
    <div className="grid bg-primary grid-cols-1 xl:grid-cols-3 border-t border-stone-400 dark:border-stone-600">
      <div className="group py-6 px-2 md:p-8 lg:p-12 border-b border-stone-400 dark:border-stone-600 md:border-b-0 md:border-r hover:bg-scanlines hover:bg-accent">
        <HeadingH3 className="text-base group-hover:text-background group-hover:font-bold">
          X.com/Twitter Profile
        </HeadingH3>
        <TwitterProfile />
      </div>

      <div className="group py-6 px-2 md:p-8 lg:p-12 border-b border-stone-400 dark:border-stone-600 md:border-b-0 md:border-r hover:bg-scanlines hover:bg-accent">
        <HeadingH3 className="text-base group-hover:text-background group-hover:font-bold">
          X.com/Twitter Likes
        </HeadingH3>
        <TwitterLikes />
      </div>

      <div className="group py-6 px-2 md:p-8 lg:p-12 hover:bg-scanlines hover:bg-accent">
        <HeadingH3 className="text-base group-hover:text-background group-hover:font-bold">
          X.com/Twitter Buttons
        </HeadingH3>
        <TwitterButtons />
      </div>
    </div>
  );
};

export default Row1;
