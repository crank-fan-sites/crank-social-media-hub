import type { NextPage } from "next";
import SocialButton from "@/components/ui2/social-button";

const PatreonButton: NextPage = ({
  url,
  text,
}: {
  url: string;
  text: string;
}) => {
  text = text || "Join the Patreon";
  return (
    <SocialButton
      link="https://www.patreon.com/unelectableairwaves/"
      text={text}
      iconSrc="patreon.svg"
      iconAlt="Patreon Logo"
      className="bg-[#dc143c]"
    />
  );
};

export default PatreonButton;
