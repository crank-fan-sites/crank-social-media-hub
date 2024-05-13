import type { NextPage } from "next";
import SocialButton from "../social-button";
import { ButtonProps } from "@/components/ui2/social-button";

const DiscordButton: NextPage<ButtonProps> = ({
  url,
  title = "Join the Discord!",
  target,
  external,
}) => {
  return (
    <SocialButton
      link={url}
      text={title}
      target={target}
      external={external}
      iconSrc="discord.svg"
      iconAlt="Discord Logo"
      className="bg-[#5865f2]"
    />
  );
};

export default DiscordButton;
