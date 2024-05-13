import type { NextPage } from "next";

import Youtube from "@/components/components/youtube/youtube";
import YoutubePlaylist from "@/components/components/youtube/youtube-playlist";

import { Button } from "@/components/ui/button";
import {
  HeadingH1,
  HeadingH2,
  HeadingH3,
  Paragraph,
} from "@/components/typography";

const YoutubeRow: NextPage = ({ channel, playlistId, buttons }) => {
  return (
    <div className="grid grid-cols-1 border-t bg-primary lg:grid-cols-2 border-stone-400 dark:border-stone-600">
      <div className="px-2 py-6 border-b group md:p-2 lg:p-4 hover:bg-scanlines border-stone-400 dark:border-stone-600">
        <HeadingH3 className="text-base group-hover:font-bold">
          Latest YouTube Video
        </HeadingH3>
        <div className="youtube-video-container">
          <Youtube channel={channel} buttons={buttons} />
        </div>
      </div>

      <div className="px-2 py-6 group md:p-2 lg:p-4 hover:bg-scanlines">
        <HeadingH3 className="text-base group-hover:font-bold">
          Highlighted YouTube Playlist
        </HeadingH3>
        <div className="youtube-video-container">
          <YoutubePlaylist playlistId={playlistId} />
        </div>
      </div>
    </div>
  );
};

export default YoutubeRow;
