import React, { useRef, useState } from "react";
import { TwitchPlayer, TwitchChat, TwitchEmbed } from "react-twitch-embed";

const TwitchChatBox = (props: any) => {
  const embed = useRef(); // We use a ref instead of state to avoid rerenders.

  const handleReady = (e: any) => {
    embed.current = e;
  };

  const handleOffline = (e: any) => {
    embed.current = e;
    console.log("RRR", "offline");
  };

  return (
    <TwitchChat
      channel="unelectableairwaves"
      // video={"2063303209"}
      // autoplay
      // muted
      // hideControls={false}
      // onReady={handleReady}
      height={props.height}
      width={props.width}
      // onVideoReady={handleOffline}
      // className="lolcopter"
      // withChat={true}
    />
  );
};

export default TwitchChatBox;
