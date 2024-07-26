import type { NextPage } from "next";
import { useEffect, useRef, useState } from "react";

import YoutubePost from "@/components/components/youtube/youtube-post";

import CTAButton from "@/components/ui2/variants/youtube";

const YouTube: NextPage = ({ videos, stats, buttons }) => {
  const yt = useRef<HTMLIFrameElement>(null);
  const [selectedUrl, setSelectedUrl] = useState<string | null>(null);

  const handleVideoClick = (url: string) => {
    setSelectedUrl(url);
    if (yt.current) {
      yt.current.src = url;
    }
  };

  return (
    <>
      {buttons &&
        buttons.length > 0 &&
        buttons.map((button: any) => (
          <CTAButton key={button.id} {...button.link} />
        ))}
      {stats && (
        <div className="text-center text-white">
          <h2 className="text-2xl font-bold">YouTube Stats</h2>
          <p>Views: {stats.views}</p>
          <p>Subscribers: {stats.subs}</p>
          <p>Count: {stats.count}</p>
        </div>
      )}
      {selectedUrl && (
        <iframe
          ref={yt} // Assign the ref to the iframe
          id="youtube_video"
          width="600"
          height="340"
          frameBorder="0"
          allowFullScreen
          title="Selected YouTube Video"
        ></iframe>
      )}
      <div className="flex flex-wrap -m-2 bg-scanlines">
        {videos &&
          videos.length > 0 &&
          videos.map((item, index) => (
            <div
              key={index}
              className="w-full p-2 sm:w-1/2 md:w-1/3 lg:w-1/4"
              onClick={() => handleVideoClick(item.url)}
            >
              <YoutubePost
                publishedAt={item.publishedAt}
                title={item.title}
                thumbnail={item.thumbnail}
                description={item.description}
                url={item.url}
              />
            </div>
          ))}
      </div>
    </>
  );
};

export default YouTube;
