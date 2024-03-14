import type { NextPage } from "next";
import SocialButton from "../social-button";

const DiscordButton: NextPage = () => {
  return (
    <SocialButton
      link="https://discord.gg"
      text="Join the Discord"
      iconSrc="discord.svg"
      iconAlt="Discord Logo"
      className="bg-[#5865f2]"
    />
  );
};

export default DiscordButton;
