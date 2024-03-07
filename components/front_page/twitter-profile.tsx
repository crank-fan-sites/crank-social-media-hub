import type { NextPage } from "next";

import { useEffect, useRef } from "react";

import { Timeline } from "react-twitter-widgets";

import { Button } from "@/components/ui/button";
import {
  HeadingH1,
  HeadingH2,
  HeadingH3,
  Paragraph,
} from "@/components/typography";

const TwitterProfle: NextPage = () => {
  return (
    <Timeline
      dataSource={{
        sourceType: "profile",
        screenName: "djtomhanks",
      }}
      options={{ theme: "dark", height: 800 }}
    />
  );
};

export default TwitterProfle;
