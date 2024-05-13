import type { NextPage } from "next";
import SocialButton from "@/components/ui2/social-button";
import { ButtonProps } from "@/components/ui2/social-button";

const InstagramButton: NextPage<ButtonProps> = ({
  url,
  title = "Instagram Profile",
  target,
  external,
}) => {
  return (
    <SocialButton
      link={url}
      text={title}
      target={target}
      external={external}
      iconSrc="instagram.svg"
      iconAlt="Instagram Logo"
      className="bg-[#b900b4]"
    />
  );
};

export default InstagramButton;
