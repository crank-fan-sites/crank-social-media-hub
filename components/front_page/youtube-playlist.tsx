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

const YoutubePlaylist: NextPage = () => {
  const [playlistId, setPlaylistId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/youtube/content");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const thedata = await response.json();
        setPlaylistId(thedata.playlist_id);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const ytPlaylist = useRef(null); // Use ref for the iframe

  // Function to generate the embed URL for the playlist
  const generatePlaylistEmbedUrl = (playlistId: string) => {
    return `https://www.youtube.com/embed/videoseries?list=${playlistId}`;
  };

  // Use useEffect to set the src of the iframe after the component mounts
  useEffect(() => {
    if (ytPlaylist.current) {
      ytPlaylist.current.src = generatePlaylistEmbedUrl(playlistId);
    }
  }, [playlistId]); // Depend on playlistID so it updates if the ID changes

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    playlistId && (
      <iframe
        ref={ytPlaylist} // Assign the ref to the iframe
        id="youtube_playlist"
        width="600"
        height="340"
        frameBorder="0"
        allowFullScreen
        title="YouTube Playlist"
      ></iframe>
    )
  );
};

export default YoutubePlaylist;
