import {
  TwitterShareButton,
  TwitterFollowButton,
  TwitterMentionButton,
  TwitterDMButton,
  TwitterOnAirButton,
} from "react-twitter-embed";

import type { NextPage } from "next";

const TwitterButtons: NextPage = () => {
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
