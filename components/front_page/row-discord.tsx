import { useEffect, useState } from "react";
import type { NextPage } from "next";

import Discord from "@/components/components/discord/discord";
import DiscordWidget from "@/components/components/discord/discord-widget";

import { HeadingH3 } from "@/components/typography";

const DiscordRow: NextPage = ({ name, widget, messages, buttons }) => {
  return (
    <div className="grid grid-cols-1 border-t md:grid-cols-5 bg-primary border-stone-400 dark:border-stone-600">
      <div className="col-span-5 px-2 py-6 border-b lg:col-span-3 group md:p-8 lg:p-12 border-stone-400 dark:border-stone-600 md:border-b-0 hover-parent:bg-scanlines hover:bg-scanlines">
        <HeadingH3 className="group-hover:font-bold">
          Recent Discord {name} Chat Messages
        </HeadingH3>
        <div className="grid grid-cols-1 bg-primary border-stone-400 dark:border-stone-600">
          <Discord messages={messages} buttons={buttons} />
        </div>
      </div>

      <div className="col-span-5 px-2 py-6 border-b lg:col-span-2 group md:p-8 lg:p-12 border-stone-400 dark:border-stone-600 md:border-b-0 md:border-r hover:bg-scanlines">
        <DiscordWidget
          widget={widget}
          imageSrc="/screenshots-vertical/UnelectableAirwaves_Twitch-bird-silhouette-350x720.png"
          alt="UnelectableAirwaves Alien"
          buttons={buttons}
        />
      </div>
    </div>
  );
};

export default DiscordRow;
