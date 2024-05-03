import type { NextPage } from "next";
import SocialButton from "@/components/ui2/social-button";

const YoutubeButton: NextPage = ({
  url,
  text,
}: {
  url: string;
  text: string;
}) => {
  text = text || "Go to the YouTube Channel";
  return (
    <SocialButton
      link="https://www.patreon.com/unelectableairwaves/"
      text={text}
      iconSrc="youtube.svg"
      iconAlt="YouTube Logo"
      className="color-black bg-[#000000]"
    />
  );
};

export default YoutubeButton;
