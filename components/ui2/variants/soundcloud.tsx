import type { NextPage } from "next";
import SocialButton from "@/components/ui2/social-button";

const SoundcloudButton: NextPage = ({
  url,
  text,
}: {
  url: string;
  text: string;
}) => {
  text = text || "Go to SoundCloud Profile";
  return (
    <SocialButton
      link={url}
      text={text}
      iconSrc="soundcloud.svg"
      iconAlt="Soundcloud Logo"
      className="bg-[#ff5500]"
    />
  );
};

export default SoundcloudButton;
