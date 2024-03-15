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
      <div className="px-2 py-6 border-b group md:p-8 lg:p-12 border-stone-400 dark:border-stone-600 md:border-b-0 hover:bg-scanlines">
        <TwitterProfile />
      </div>

      <div className="px-2 py-6 group md:p-8 lg:p-12 hover:bg-scanlines">
        <HeadingH3 className="text-base group-hover:text-background group-hover:font-bold">
          Featured Songs
        </HeadingH3>
        <div className="mb-10">
          <SoundCloudPlayer trackUrl="https://soundcloud.com/dj-tom-hanks/werepyres-are-coming-down-the-mountain-pt-2?si=d8dcbd2e83694ef885526937879c6d27&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing" />
        </div>
        <div className="mb-10">
          <SoundCloudPlayer trackUrl="https://soundcloud.com/dj-tom-hanks/poundtown-the-mix-1?si=09fded8cfafb409c806cf970f9a16deb&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing" />
        </div>
        <div className="mb-10">
          <SoundCloudPlayer trackUrl="https://soundcloud.com/dj-tom-hanks/staybad-volume-1?si=ae9fe7df5a7943738f54bd7f654da79d&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing" />
        </div>
      </div>
    </div>
  );
};

export default Row1;
