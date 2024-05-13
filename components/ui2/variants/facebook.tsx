import type { NextPage } from "next";
import SocialButton from "@/components/ui2/social-button";
import { ButtonProps } from "@/components/ui2/social-button";

const FacebookButton: NextPage<ButtonProps> = ({
  url,
  title = "Facebook Page",
  target,
  external,
}) => {
  return (
    <SocialButton
      link={url}
      text={title}
      target={target}
      external={external}
      iconSrc="facebook.svg"
      iconAlt="Facebook Logo"
      className="bg-[#1877f2]"
    />
  );
};

export default FacebookButton;
