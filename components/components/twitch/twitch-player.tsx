import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { TwitchEmbed } from "react-twitch-embed";

// import CTAButton from "@/components/ui2/variants/twitch";

const Twitch: NextPage = ({ channel, height, width }) => {
  // const [channel, setChannel] = useState(null);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch("/api/twitch/content");
  //       if (!response.ok) {
  //         throw new Error("Network response was not ok");
  //       }
  //       const thedata = await response.json();
  //       setChannel(thedata.channel_handle);
  //     } catch (error) {
  //       setError(error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, []);

  // if (loading) return <div>Loading...</div>;
  // if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      {channel && (
        <div>
          <TwitchEmbed
            channel={channel}
            autoplay
            muted
            hideControls={false}
            height={height || 480}
            width={width || 960}
            className="lolcopter"
            withChat={true}
          />
        </div>
      )}
    </>
  );
};

export default Twitch;
