import type { NextPage } from "next";
import { useEffect, useRef, useState } from "react";

const YouTube: NextPage = () => {
  const [channel, setChannel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const yt = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/youtube/content");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const thedata = await response.json();
        setChannel(thedata.channel_id);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  async function getYTJson(channelId) {
    try {
      const reqURL = "https://www.youtube.com/feeds/videos.xml?channel_id=";
      const response = await fetch(
        `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(
          reqURL + channel
        )}`
      );
      console.log("res", response);
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
    console.log("c", channel);
  }, [channel]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    channel && (
      <iframe
        ref={yt} // Assign the ref to the iframe
        id="youtube_video"
        width="600"
        height="340"
        frameBorder="0"
        allowFullScreen
        title="Unelectable Latest YouTube Video"
      ></iframe>
    )
  );
};

export default YouTube;
