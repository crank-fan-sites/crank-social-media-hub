import type { NextPage } from "next";
import SocialButton from "@/components/ui2/social-button";

const InstagramButton: NextPage = ({
  url,
  text,
}: {
  url: string;
  text: string;
}) => {
  text = text || "Instagram Profile";
  return (
    <SocialButton
      link={url}
      text={text}
      iconSrc="instagram.svg"
      iconAlt="Instagram Logo"
      className="bg-[#b900b4]"
    />
  );
};

export default InstagramButton;
