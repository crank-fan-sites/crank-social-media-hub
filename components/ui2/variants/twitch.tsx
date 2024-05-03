import type { NextPage } from "next";
import SocialButton from "@/components/ui2/social-button";

const TwitchButton: NextPage = ({
  url,
  text,
}: {
  url: string;
  text: string;
}) => {
  text = text || "Twitch Profile";
  return (
    <SocialButton
      link={url}
      text={text}
      iconSrc="twitch.svg"
      iconAlt="Twitch Logo"
      className="bg-[#9146ff]"
    />
  );
};

export default TwitchButton;
