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

  const [videoInfo, setVideoInfo] = useState({ creator: null, id: null });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/tiktok/content");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const thedata = await response.json();
        setVideoInfo({ creator: thedata.videoCreator, id: thedata.videoId });
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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

  async function start() {
    const url = `https://www.tiktok.com/@${videoInfo.creator}/video/${videoInfo.id}`;
    const data = await loadDataFromURL(url);
    if (contentRef.current) {
      contentRef.current.innerHTML = data.html;
      loadTikTokScript();
    }
  }

  useEffect(() => {
    start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoInfo]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return videoInfo.creator && <div id="content" ref={contentRef} />;
};

export default TiktokVideo;
