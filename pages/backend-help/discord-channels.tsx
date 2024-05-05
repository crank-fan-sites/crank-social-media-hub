import { useState, useEffect } from "react";

import { NextPage } from "next";
import { MainLayout } from "@/layouts/layout";
import { HeadingH1 } from "@/components/typography";
import { links } from "@/lib/links";
import { Button } from "@/components/ui/button";

import useStrapiAxios from "@/lib/strapiAxios";

const DiscordChannels: NextPage = () => {
  const [channels, setChannels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/discord/channels");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const thedata = await response.json();
        setChannels(thedata);
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
    <MainLayout>
      <div className="container px-4">
        <HeadingH1 className="my-8">Channels</HeadingH1>
        <p>Enter the channel id into the Discord section of the CMS</p>
        {channels.map((channel) => (
          <li key={channel.id}>
            {channel.name} - ID: {channel.id}
          </li>
        ))}
      </div>
    </MainLayout>
  );
};

export default DiscordChannels;
