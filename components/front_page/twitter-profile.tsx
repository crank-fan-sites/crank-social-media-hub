import type { NextPage } from "next";
import { useEffect, useState } from "react";

import { Timeline } from "react-twitter-widgets";

const TwitterProfle: NextPage = () => {
  const [profile, setProfile] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [height, setHeight] = useState(800);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/twitter/content");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const thedata = await response.json();

        setProfile(thedata.profile);
        setDarkMode(thedata.darkMode);
        setHeight(thedata.widgetHeight);
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
