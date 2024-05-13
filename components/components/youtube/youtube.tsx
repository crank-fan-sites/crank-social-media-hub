import type { NextPage } from "next";
import { useEffect, useRef, useState } from "react";

import CTAButton from "@/components/ui2/variants/youtube";

const YouTube: NextPage = ({ channel, buttons }) => {
  const yt = useRef(null);

  async function getYTJson(channelId) {
    try {
      const reqURL = "https://www.youtube.com/feeds/videos.xml?channel_id=";
      const response = await fetch(
        `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(
          reqURL + channelId
        )}`
      );
      // console.log("res", response);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const responseJson = await response.json();

      if (responseJson.items && responseJson.items.length > 0) {
        const link = responseJson.items[0].link;
        const id = link.substr(link.indexOf("=") + 1);

        if (yt.current) {
          yt.current.src = `https://youtube.com/embed/${id}?controls=0&showinfo=0&rel=0`;
        }
      } else {
        console.error("No items found in the response");
      }
    } catch (error) {
      console.error("getYTJson error:", error);
    }
  }

  // Call getYTJson when the component mounts
  useEffect(() => {
    if (channel && yt.current) {
      getYTJson(channel);
    }
  }, [channel]);

  return (
    <>
      {buttons &&
        buttons.length > 0 &&
        buttons.map((button: any) => (
          <CTAButton key={button.id} {...button.link} />
        ))}
      {channel && (
        <iframe
          ref={yt} // Assign the ref to the iframe
          id="youtube_video"
          width="600"
          height="340"
          frameBorder="0"
          allowFullScreen
          title="Unelectable Latest YouTube Video"
        ></iframe>
      )}
    </>
  );
};

export default YouTube;
