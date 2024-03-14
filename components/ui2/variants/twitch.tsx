import type { NextPage } from "next";
import SocialButton from "@/components/ui2/social-button";

const TwitchButton: NextPage = () => {
  return (
    <SocialButton
      link="https://twitch.tv/unelectableairwaves"
      text="Twitch Proile"
      iconSrc="twitch.svg"
      iconAlt="Twitch Logo"
      className="bg-[#9146ff]"
    />
  );
};

export default TwitchButton;
