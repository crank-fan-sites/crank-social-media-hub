import type { NextPage } from "next";
import { useEffect, useState } from "react";

import { Timeline } from "react-twitter-widgets";

const TwitterProfle: NextPage = ({ profile, darkMode, height }) => {
  return (
    profile && (
      <Timeline
        dataSource={{
          sourceType: "profile",
          screenName: profile,
        }}
        options={{ theme: darkMode ? "dark" : "light", height }}
      />
    )
  );
};

export default TwitterProfle;
