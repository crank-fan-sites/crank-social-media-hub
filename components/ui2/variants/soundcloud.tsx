import type { NextPage } from "next";
import SocialButton from "@/components/ui2/social-button";
import { ButtonProps } from "@/components/ui2/social-button";

const YoutubeButton: NextPage<ButtonProps> = ({
  url,
  title = "Go to SoundCloud Profile",
  target,
  external,
}) => {
  return (
    <SocialButton
      link={url}
      text={title}
      target={target}
      external={external}
      iconSrc="soundcloud.svg"
      iconAlt="Soundcloud Logo"
      className="bg-[#ff5500]"
    />
  );
};

export default SoundcloudButton;
