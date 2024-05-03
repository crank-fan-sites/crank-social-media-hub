import type { NextPage } from "next";
import SocialButton from "@/components/ui2/social-button";

const RedditButton: NextPage = ({
  url,
  text,
}: {
  url: string;
  text: string;
}) => {
  text = text || "Go to the subreddit";
  return (
    <SocialButton
      link={url}
      text={text}
      iconSrc="reddit.svg"
      iconAlt="Reddit Logo"
      className="bg-[#FF4500]"
    />
  );
};

export default RedditButton;
