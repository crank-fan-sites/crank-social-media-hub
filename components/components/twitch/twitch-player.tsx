import type { NextPage } from "next";
import { TwitchEmbed } from "react-twitch-embed";

const Twitch: NextPage = ({ channel, height, width }) => {
  return (
    <>
      {channel && (
        <div>
          <TwitchEmbed
            channel={channel}
            autoplay
            muted
            hideControls={false}
            height={height || 480}
            width={width || 960}
            className="lolcopter"
            withChat={true}
          />
        </div>
      )}
    </>
  );
};

export default Twitch;
