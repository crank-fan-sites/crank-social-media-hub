import type { NextPage } from "next";

import { useEffect, useRef } from "react";

const TiktokVideo: NextPage = ({ videoCreator, videoId }) => {
  const contentRef = useRef(null);

  const loadTikTokScript = () => {
    const script = document.createElement("script");
    script.src = "https://www.tiktok.com/embed.js";
    script.async = true;
    document.body.appendChild(script);
  };

  async function loadDataFromURL(url: string) {
    const oembed = `https://www.tiktok.com/oembed?url=${url}`;
    try {
      const response = await fetch(oembed);
      const data = await response.json();
      if (data === undefined) {
        throw new Error("No data received from oembed");
      }
      return data;
    } catch (error) {
      setError(error);
    }
  }

  async function start(videoCreator: string, videoId: string) {
    const url = `https://www.tiktok.com/@${videoCreator}/video/${videoId}`;
    const data = await loadDataFromURL(url);
    if (contentRef.current) {
      contentRef.current.innerHTML = data.html;
      loadTikTokScript();
    }
  }

  useEffect(() => {
    if (videoCreator == null || videoId == null) {
      return;
    }
    start(videoCreator, videoId);
  }, [videoCreator, videoId]);

  return videoCreator && <div id="content" ref={contentRef} />;
};

export default TiktokVideo;
