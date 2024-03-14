import type { NextPage } from "next";
import SocialButton from "@/components/ui2/social-button";

const FollowButton: NextPage = () => {
  return (
    <SocialButton
      link="https://twitter.com/intent/tweet?original_referer=http%3A%2F%2Flocalhost%3A3000%2F&ref_src=twsrc%5Etfw%7Ctwcamp%5Ebuttonembed%7Ctwterm%5Eshare%7Ctwgr%5E&text=Leftism%20and%20Aliens%20are%20awesome%20on%20UnelectableAirwaves&url=https%3A%2F%2Ftwitch.tv%2FUnelectableAirwaves&via=djtomhanks"
      text="Post about @djtomhanks"
      iconSrc="x.svg"
      iconAlt="X Logo"
      className="bg-[#000000]"
    />
  );
};

export default FollowButton;
