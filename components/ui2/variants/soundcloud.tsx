import type { NextPage } from "next";
import SocialButton from "@/components/ui2/social-button";

const SoundcloudButton: NextPage = () => {
  return (
    <SocialButton
      link="https://soundcloud.com/djtomhanks"
      text="Soundcloud Profile"
      iconSrc="soundcloud.svg"
      iconAlt="Soundcloud Logo"
      className="bg-[#ff5500]"
    />
  );
};

export default SoundcloudButton;
