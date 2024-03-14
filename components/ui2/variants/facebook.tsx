import type { NextPage } from "next";
import SocialButton from "@/components/ui2/social-button";

const FacebookButton: NextPage = () => {
  return (
    <SocialButton
      link="https://www.facebook.com/UnelectableAirwaves"
      text="Facebook Page"
      iconSrc="facebook.svg"
      iconAlt="Facebook Logo"
      className="bg-[#1877f2]"
    />
  );
};

export default FacebookButton;
