import type { NextPage } from "next";
import SocialButton from "@/components/ui2/social-button";

const InstagramButton: NextPage = () => {
  return (
    <SocialButton
      link="https://instagram.com/StalinChad"
      text="Instagram Profile"
      iconSrc="instagram.svg"
      iconAlt="Instagram Logo"
      className="bg-[#b900b4]"
    />
  );
};

export default InstagramButton;
