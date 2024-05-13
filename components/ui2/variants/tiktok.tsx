import type { NextPage } from "next";
import SocialButton from "@/components/ui2/social-button";
import { ButtonProps } from "@/components/ui2/social-button";

const YoutubeButton: NextPage<ButtonProps> = ({
  url,
  title = "Tiktok Profile",
  target,
  external,
}) => {
  return (
    <SocialButton
      link={url}
      text={title}
      target={target}
      external={external}
      iconSrc="tiktok.svg"
      iconAlt="Tiktok Logo"
      className="bg-[#000000]"
    />
  );
};

export default TiktokButton;
