import type { NextPage } from "next";
import SocialButton from "@/components/ui2/social-button";

const PatreonButton: NextPage = () => {
  return (
    <SocialButton
      link="https://www.patreon.com/unelectableairwaves/"
      text="Join the Patreon"
      iconSrc="patreon.svg"
      iconAlt="Patreon Logo"
      className="bg-[#dc143c]"
    />
  );
};

export default PatreonButton;
