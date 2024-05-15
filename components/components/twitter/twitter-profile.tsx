import type { NextPage } from "next";
import { useEffect, useState } from "react";

import { Timeline } from "react-twitter-widgets";

import { HeadingH3 } from "@/components/typography";

const TwitterProfle: NextPage = ({ profile, darkMode, height }) => {
  return (
    profile && (
      <div>
        <HeadingH3 className="group-hover:font-bold">
          Twitter Timeline
        </HeadingH3>
        <Timeline
          dataSource={{
            sourceType: "profile",
            screenName: profile,
          }}
          options={{ theme: darkMode ? "dark" : "light", height }}
        />
      </div>
    )
  );
};

export default TwitterProfle;
