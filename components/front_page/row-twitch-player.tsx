import type { NextPage } from "next";

import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import {
  HeadingH1,
  HeadingH2,
  HeadingH3,
  Paragraph,
} from "@/components/typography";

import { Icons } from "@/components/icons";

import TwitchEmbed from "@/components/components/twitch/twitch-player";

const TwitchRow: NextPage = () => {
  return (
    <div>
      <div className="grid grid-cols-1 py-1 border-t bg-primary place-items-center border-stone-400 dark:border-stone-600">
        <Icons.skull className="w-6 h-6 m-2 opacity-60" strokeWidth="1.5" />
      </div>

      <div className="grid grid-cols-1 pb-12 bg-primary place-items-center hover:bg-accent">
        <div className="grid w-full h-full p-1 place-items-center">
          <div className="twitch-video-container">
            <TwitchEmbed height={480} width={960} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TwitchRow;
