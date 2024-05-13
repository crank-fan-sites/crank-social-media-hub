import type { NextPage } from "next";
import SocialButton from "@/components/ui2/social-button";
import { ButtonProps } from "@/components/ui2/social-button";

const TwitchButton: NextPage<ButtonProps> = ({
  url,
  title = "Twitch Profile",
  target,
  external,
}) => {
  return (
    <SocialButton
      link={url}
      text={title}
      target={target}
      external={external}
      iconSrc="twitch.svg"
      iconAlt="Twitch Logo"
      className="bg-[#9146ff]"
    />
  );
};

export default TwitchButton;
