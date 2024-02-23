import {
  TwitterTimelineEmbed,
  TwitterShareButton,
  TwitterFollowButton,
  TwitterHashtagButton,
  TwitterMentionButton,
  TwitterTweetEmbed,
  TwitterMomentShare,
  TwitterDMButton,
  TwitterVideoEmbed,
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

const TwitterProfle: NextPage = () => {
  const router = useRouter();
  const yt = useRef(null); // Initialize the ref

  return (
    <TwitterTimelineEmbed
      sourceType="profile"
      screenName="djtomhanks"
      options={{ height: 800 }}
    />
  );
};

export default TwitterProfle;
