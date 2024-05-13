import type { NextPage } from "next";
import SocialButton from "@/components/ui2/social-button";
import { ButtonProps } from "@/components/ui2/social-button";

const PatreonButton: NextPage<ButtonProps> = ({
  url,
  title = "Join the Patreon",
  target,
  external,
}) => {
  return (
    <SocialButton
      link={url}
      text={title}
      target={target}
      external={external}
      iconSrc="patreon.svg"
      iconAlt="Patreon Logo"
      className="bg-[#dc143c]"
    />
  );
};

export default PatreonButton;
