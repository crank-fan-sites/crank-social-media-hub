import type { NextPage } from "next";
import SocialButton from "@/components/ui2/social-button";

const YoutubeButton: NextPage = () => {
  return (
    <SocialButton
      link="https://www.youtube.com/@UnelectableAirwaves"
      text="YouTube Channel"
      iconSrc="youtube.svg"
      iconAlt="YouTube Logo"
      className="color-black bg-[#000000]"
    />
  );
};

export default YoutubeButton;
