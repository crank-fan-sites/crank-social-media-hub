import type { NextPage } from "next";

import TwitchEmbed from "@/components/components/twitch/twitch-player";

const TwitchRow: NextPage = ({ channel, height, width }) => {
  return (
    <div className="grid grid-cols-1 pb-12 bg-primary place-items-center hover:bg-accent hover:bg-scanlines">
      <div className="grid w-full h-full p-1 place-items-center">
        <div className="twitch-video-container">
          <TwitchEmbed channel={channel} height={height} width={width} />
        </div>
      </div>
    </div>
  );
};

export default TwitchRow;
