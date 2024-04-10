import type { NextPage } from "next";

import { useEffect, useRef } from "react";
import { useRouter } from "next/router";

import { Button } from "@/components/ui/button";
import {
  HeadingH1,
  HeadingH2,
  HeadingH3,
  Paragraph,
} from "@/components/typography";

const YoutubePlaylist: NextPage = () => {
  const ytPlaylist = useRef(null); // Use ref for the iframe
  const playlistID = "PLZUwR5BGUTIUvA_IUIplO6XP7sSiJXTZK"; // Example playlist ID

  // Function to generate the embed URL for the playlist
  const generatePlaylistEmbedUrl = (playlistID: string) => {
    return `https://www.youtube.com/embed/videoseries?list=${playlistID}`;
  };

  // Use useEffect to set the src of the iframe after the component mounts
  useEffect(() => {
    if (ytPlaylist.current) {
      ytPlaylist.current.src = generatePlaylistEmbedUrl(playlistID);
    }
  }, [playlistID]); // Depend on playlistID so it updates if the ID changes

  return (
    <iframe
      ref={ytPlaylist} // Assign the ref to the iframe
      id="youtube_playlist"
      width="600"
      height="340"
      frameBorder="0"
      allowFullScreen
      title="YouTube Playlist"
    ></iframe>
  );
};

export default YoutubePlaylist;
