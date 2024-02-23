import {
  TwitterShareButton,
  TwitterFollowButton,
  TwitterMentionButton,
  TwitterDMButton,
  TwitterOnAirButton,
} from "react-twitter-embed";

import type { NextPage } from "next";

import { useEffect, useRef } from "react";
import { useRouter } from "next/router";

import { Button } from "@/components/ui/button";
import {
  HeadingH1,
  HeadingH2,
  HeadingH3,
  Paragraph,
} from "@/components/typography";

const TwitterButtons: NextPage = () => {
  const router = useRouter();
  const yt = useRef(null); // Initialize the ref

  return (
    <>
      <TwitterFollowButton screenName={"djtomhanks"} />
      <TwitterMentionButton screenName={"djtomhanks"} />

      <TwitterDMButton id={17081882} />
      <TwitterShareButton
        url={"https://twitch.tv/UnelectableAirwaves"}
        options={{
          text: "Leftism and Aliens are awesome on UnelectableAirwaves",
          via: "djtomhanks",
        }}
      />
      <TwitterOnAirButton username={"chase_saddy"} />
    </>
  );
};

export default TwitterButtons;
