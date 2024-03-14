import type { NextPage } from "next";
import SocialButton from "@/components/ui2/social-button";

const TiktokButton: NextPage = () => {
  return (
    <SocialButton
      link="https://www.tiktok.com/@daddytankee"
      text="Tiktok Profile"
      iconSrc="tiktok.svg"
      iconAlt="Tiktok Logo"
      className="bg-[#000000]"
    />
  );
};

export default TiktokButton;
