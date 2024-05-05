import { useState, useEffect } from "react";

import { NextPage } from "next";
import { MainLayout } from "@/layouts/layout";
import { HeadingH1 } from "@/components/typography";

const PatreonCampaigns: NextPage = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/patreon/campaigns");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const thedata = await response.json();
        setCampaigns(thedata.campaigns);
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
        <p>Enter the correct ID into the Patreon campaign_id of the CMS</p>
        {campaigns.map((campaign) => (
          <ul key={campaign.id}>
            <li>ID: {campaign.id}</li>
            <li>Name 1: {campaign.attributes.name}</li>
            <li>Name 2: {campaign.attributes.creation_name}</li>
            <li>Summary: {campaign.attributes.summary}</li>
            <li>Patron Count: {campaign.attributes.patron_count}</li>
          </ul>
        ))}
      </div>
    </MainLayout>
  );
};

export default PatreonCampaigns;
