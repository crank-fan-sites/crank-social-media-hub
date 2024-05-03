import { useEffect, useState } from "react";
import type { NextPage } from "next";

import { HeadingH3 } from "@/components/typography";

import SoundCloudPlayer from "./soundcloud-player";

import CTAButton from "@/components/ui2/variants/soundcloud";

const Soundcloud: NextPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/soundcloud/content");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const thedata = await response.json();
        setData(thedata);
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
    <div className="px-2 py-6 group md:p-8 lg:p-12 hover:bg-scanlines">
      <HeadingH3 className="text-base group-hover:font-bold">
        Featured Songs
      </HeadingH3>
      <CTAButton
        url="https://soundcloud.com/dj-tom-hanks"
        text="Go to SoundCloud Profile"
      />
      {data.length > 0 &&
        data.map((item) => (
          <div className="mb-10" key={item.id}>
            <SoundCloudPlayer trackUrl={item.url} />
          </div>
        ))}
    </div>
  );
};

export default Soundcloud;
