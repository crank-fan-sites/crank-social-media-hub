import type { NextPage } from "next";
import SocialButton from "../social-button";

const DiscordButton: NextPage = ({
  url,
  text,
}: {
  url: string;
  text: string;
}) => {
  text = text || "Join the Discord";
  return (
    <SocialButton
      link={url}
      text={text}
      iconSrc="discord.svg"
      iconAlt="Discord Logo"
      className="bg-[#5865f2]"
    />
  );
};

export default DiscordButton;
