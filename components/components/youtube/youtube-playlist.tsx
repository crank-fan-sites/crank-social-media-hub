import type { NextPage } from "next";

import { useEffect, useRef } from "react";

const YoutubePlaylist: NextPage = ({ playlistId }) => {
  const ytPlaylist = useRef(null); // Use ref for the iframe

  // Function to generate the embed URL for the playlist
  const generatePlaylistEmbedUrl = (playlistId: string) => {
    return `https://www.youtube.com/embed/videoseries?list=${playlistId}`;
  };

  // Use useEffect to set the src of the iframe after the component mounts
  useEffect(() => {
    if (playlistId) {
      if (ytPlaylist.current) {
        ytPlaylist.current.src = generatePlaylistEmbedUrl(playlistId);
      }
    }
  }, [playlistId]); // Depend on playlistID so it updates if the ID changes

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
