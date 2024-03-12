import type { NextPage } from "next";

import { TwitchPlayer } from "react-twitch-embed";

import { Button } from "@/components/ui/button";
import {
  HeadingH1,
  HeadingH2,
  HeadingH3,
  Paragraph,
} from "@/components/typography";

const Row1: NextPage = () => {
  return (
    <div className="grid grid-cols-1 border-t bg-primary lg:grid-cols-2 border-stone-400 dark:border-stone-600">
      <div className="px-2 py-6 border-b group md:p-2 lg:p-4 border-stone-400 dark:border-stone-600 md:border-b-0 md:border-r hover:bg-scanlines hover:bg-accent">
        <div className="px-1 py-4 pl-2 ml-20 md:p-4 lg:p-4 lg:pl-0">
          <HeadingH2 className="text-base group-hover:text-background group-hover:font-bold">
            Highlighted Twitch Clips
          </HeadingH2>
          <div className="twitch-player-container">
            <TwitchPlayer
              // channel="unelectableairwaves"
              collection="Fx6m6WjAdhfwig"
              autoplay={false}
              muted
              width={540}
              height={480}
            />
          </div>
        </div>
      </div>
      <div className="px-2 py-6 group md:p-8 lg:p-12 hover:bg-scanlines hover:bg-accent">
        <HeadingH3 className="text-base group-hover:text-background group-hover:font-bold">
          About Crankiness
        </HeadingH3>
        Imagine that you are in my shoes, that you are experiencing this. Then
        in the end you are portrayed as problematic, pushed out, the project you
        invested 3 years in is practically stolen from you. Yes, it seems like
        an extremely black and white situation to me. I have never experienced
        anything so unfair, I had the feeling that I was so badly played, taken
        advantage of. And no, the fact that I can't see my mistakes is not true
        at all. I usually have a problem with this, that I give in too quickly,
        because I immediately find fault with myself, I start drowning in a bad
        conscience. That's kind of my default response.
      </div>
    </div>
  );
};

export default Row1;
