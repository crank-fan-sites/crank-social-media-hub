import type { NextPage } from "next";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";

import { Button } from "@/components/ui/button";
import {
  HeadingH1,
  HeadingH2,
  HeadingH3,
  Paragraph,
} from "@/components/typography";

const TiktokVideo: NextPage = () => {
  const contentRef = useRef(null); // Initialize the ref with useRef

  const loadTikTokScript = () => {
    const script = document.createElement("script");
    script.src = "https://www.tiktok.com/embed.js";
    script.async = true;
    document.body.appendChild(script);
  };

  async function loadDataFromURL(url: string) {
    const oembed = `https://www.tiktok.com/oembed?url=${url}`;
    const response = await fetch(oembed);
    const data = await response.json();
    if (data === undefined) {
      throw new Error("No data received from oembed");
    }
    return data;
  }

  async function start() {
    const url = "https://www.tiktok.com/@daddytankee/video/7335846631394282795";
    const data = await loadDataFromURL(url);
    if (contentRef.current) {
      contentRef.current.innerHTML = data.html;
      loadTikTokScript();
    }
  }

  useEffect(() => {
    start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div id="content" ref={contentRef} />;
};

export default TiktokVideo;
