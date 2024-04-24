import type { NextPage } from "next";

const SoundCloudPlayer: NextPage = ({ trackUrl }) => {
  const src = `https://w.soundcloud.com/player/?url=${encodeURIComponent(
    trackUrl
  )}&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true`;

  return (
    <iframe
      width="100%"
      height="166"
      scrolling="no"
      frameBorder="no"
      allow="autoplay"
      src={src}
      title="SoundCloud Player"
    ></iframe>
  );
};

export default SoundCloudPlayer;
