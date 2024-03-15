import type { NextPage } from "next";

import Discord from "@/components/front_page/discord";

import SocialButton from "@/components/ui2/social-button";
import { HeadingH3, Paragraph } from "@/components/typography";

import styles from "./button.module.css";

const Row5: NextPage = () => {
  return (
    <div className="grid grid-cols-1 border-t md:grid-cols-5 bg-primary border-stone-400 dark:border-stone-600">
      <div className="col-span-5 px-2 py-6 border-b lg:col-span-3 group md:p-8 lg:p-12 border-stone-400 dark:border-stone-600 md:border-b-0 hover:bg-scanlines">
        <HeadingH3 className="text-base group-hover:text-background group-hover:font-bold">
          Recent Discord General Chat Messages
        </HeadingH3>
        <div className="grid grid-cols-1 border-t bg-primary border-stone-400 dark:border-stone-600">
          <Discord />
        </div>
      </div>
      <div className="col-span-5 px-2 py-6 border-b lg:col-span-2 group lg:p-8 lg:p-12 border-stone-400 dark:border-stone-600 md:border-b-0 md:border-r hover:bg-scanlines">
        <HeadingH3 className="text-base group-hover:text-background group-hover:font-bold">
          Discord Widget
        </HeadingH3>

        <div className="patreon-container">
          <iframe
            src="https://discord.com/widget?id=855475575217061898&theme=dark"
            width="350"
            height="500"
            sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
          ></iframe>
        </div>

        <div className="items-center justify-center hidden p-0 lg:flex">
          <img
            src="/screenshots-vertical/UnelectableAirwaves_Twitch-bird-silhouette-350x720.png"
            width="100%"
            alt="UnelectableAirwaves Alien"
          />
        </div>
      </div>
    </div>
  );
};

export default Row5;
