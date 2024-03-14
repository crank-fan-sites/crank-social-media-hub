import type { NextPage } from "next";
import SocialButton from "@/components/ui2/social-button";

const RedditButton: NextPage = () => {
  return (
    <SocialButton
      link="https://www.reddit.com/r/unelectableairwaves"
      text="The Subreddit"
      iconSrc="reddit.svg"
      iconAlt="Reddit Logo"
      className="bg-[#FF4500]"
    />
  );
};

export default RedditButton;
