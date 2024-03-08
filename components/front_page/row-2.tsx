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
    <div className="grid bg-primary grid-cols-1 lg:grid-cols-3 border-t border-stone-400 dark:border-stone-600">
      <div className="group py-6 px-2 md:p-8 lg:p-12 border-b border-stone-400 dark:border-stone-600 md:border-b-0 md:border-r hover:bg-scanlines hover:bg-accent">
        <HeadingH3 className="text-base group-hover:text-background group-hover:font-bold">
          A Header Headline
        </HeadingH3>
        <TwitterProfile />
      </div>

      <div className="group py-6 px-2 md:p-8 lg:p-12 border-b border-stone-400 dark:border-stone-600 md:border-b-0 md:border-r hover:bg-scanlines hover:bg-accent">
        <HeadingH3 className="text-base group-hover:text-background group-hover:font-bold">
          Crank Crank
        </HeadingH3>
        <Paragraph className="group-hover:text-background group-hover:font-bold">
          Yes we&lsquo;re still releasing media. Check out our latest releases
        </Paragraph>
        <SoundCloudPlayer trackUrl="https://soundcloud.com/dj-tom-hanks/werepyres-are-coming-down-the-mountain-pt-2" />
        <Button
          className="p-0 group-hover:text-background group-hover:italic hover:font-bold"
          variant="link"
          onClick={() => router.push("/label")}
        >
          Press play
        </Button>
      </div>

      <div className="group py-6 px-2 md:p-8 lg:p-12 hover:bg-scanlines hover:bg-accent">
        <HeadingH3 className="text-base group-hover:text-background group-hover:font-bold">
          Connect with djtomhanks
        </HeadingH3>
        <Paragraph className="group-hover:text-background group-hover:font-bold">
          Sign up for the newsletter, follow us on all socials, and email for
          whatever
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
  );
};

export default Row1;
