import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { TwitchPlayer } from "react-twitch-embed";

const Twitch: NextPage = (props: any) => {
  const [highlighted, setHighlighted] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/twitch/content");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const thedata = await response.json();
        setHighlighted(thedata.highlighted_playlist);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return (
    highlighted && (
      <div className="twitch-player-container">
        <TwitchPlayer
          collection={highlighted || undefined}
          autoplay={false}
          muted
          width={props.width || 540}
          height={props.height || 480}
        />
      </div>
    )
  );
};

export default Twitch;
