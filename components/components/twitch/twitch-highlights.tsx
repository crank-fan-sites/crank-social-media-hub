import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { TwitchPlayer } from "react-twitch-embed";

const Twitch: NextPage = ({ highlighted, width, height }) => {
  return (
    <>
      {highlighted && (
        <div className="twitch-player-container">
          <TwitchPlayer
            collection={highlighted || undefined}
            autoplay={false}
            muted
            width={width || 540}
            height={height || 480}
          />
        </div>
      )}
    </>
  );
};

export default Twitch;
