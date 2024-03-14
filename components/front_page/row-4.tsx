import type { NextPage } from "next";

import SocialButton from "@/components/ui2/social-button";
import { HeadingH3, Paragraph } from "@/components/typography";

import styles from "./button.module.css";

const Row5: NextPage = () => {
  return (
    <div className="grid grid-cols-2 border-t bg-primary border-stone-400 dark:border-stone-600">
      <div className="px-2 py-6 border-b group md:p-8 lg:p-12 border-stone-400 dark:border-stone-600 md:border-b-0 md:border-r hover:bg-scanlines hover:bg-accent">
        <HeadingH3 className="text-base group-hover:text-background group-hover:font-bold">
          Twitter Profile
        </HeadingH3>
        <div className="reddit-container">
          <>
            <iframe
              src="https://discord.com/widget?id=855475575217061898&theme=dark"
              width="350"
              height="500"
              sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
            ></iframe>
          </>
        </div>
      </div>
      <div className="flex items-center justify-center p-0">
        <img
          src="/screenshots-vertical/Twitch-unelectable-text-600x720_vertical.png"
          alt="UnelectableAirwaves Alien"
        />
      </div>
    </div>
  );
};

export default Row5;
