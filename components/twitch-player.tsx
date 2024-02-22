import React, { useRef, useState } from "react";
import { TwitchPlayer } from "react-twitch-embed";

const Twitch = (props: any) => {
  const embed = useRef(); // We use a ref instead of state to avoid rerenders.

  const handleReady = (e: any) => {
    embed.current = e;
  };

  const handleOffline = (e: any) => {
    embed.current = e;
    console.log("RRR", "offline");
  };

  return (
    <div className="">
      <TwitchPlayer
        channel="unelectableairwaves"
        // video={"2063303209"}
        autoplay
        muted
        hideControls={false}
        onReady={handleReady}
        height={props.height}
        width={props.width}
        onOffline={handleOffline}
        className="lolcopter"
      />
    </div>
  );
};

export default Twitch;
