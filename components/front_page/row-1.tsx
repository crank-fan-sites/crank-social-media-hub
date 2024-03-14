import type { NextPage } from "next";

import { useEffect, useRef } from "react";
import { useRouter } from "next/router";

import { Button } from "@/components/ui/button";
import {
  HeadingH1,
  HeadingH2,
  HeadingH3,
  Paragraph,
} from "@/components/typography";

const Row00: NextPage = () => {
  const router = useRouter();
  const yt = useRef(null); // Initialize the ref

  return (
    <div className="grid grid-cols-1 border-t bg-primary lg:grid-cols-2 border-stone-400 dark:border-stone-600">
      <div className="px-2 py-6 border-b group md:p-2 lg:p-4 border-stone-400 dark:border-stone-600 md:border-b-0 md:border-r hover:bg-scanlines hover:bg-accent">
        <HeadingH3 className="text-base group-hover:text-background group-hover:font-bold">
          Latest YouTube Video
        </HeadingH3>
        {/* <div className="youtube-embed-overlap"> */}
        <div className="youtube-video-container">{/* <YT /> */}</div>
        <Button
          className="p-0 group-hover:text-background group-hover:italic hover:font-bold"
          variant="link"
          onClick={() => router.push("/contact")}
        >
          Go to YouTube
        </Button>
      </div>

      <div className="px-2 py-6 group md:p-8 lg:p-12 hover:bg-scanlines hover:bg-accent">
        <HeadingH3 className="text-base group-hover:text-background group-hover:font-bold">
          Highlighted YouTube Playlist
        </HeadingH3>
        <div className="youtube-video-container">
          {/* <YoutubePlaylist /> */}
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
  );
};

export default Row00;
