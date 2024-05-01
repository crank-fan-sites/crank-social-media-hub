import { useEffect, useState } from "react";
import type { NextPage } from "next";

import Discord from "@/components/front_page/discord";

import SocialButton from "@/components/ui2/social-button";
import { HeadingH3, Paragraph } from "@/components/typography";
import Image from "next/image";

const RowDiscord: NextPage = () => {
  const [info, setInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/discord/content");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const thedata = await response.json();
        setInfo(thedata);
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
    <div className="grid grid-cols-1 border-t md:grid-cols-5 bg-primary border-stone-400 dark:border-stone-600">
      <div className="col-span-5 px-2 py-6 border-b lg:col-span-3 group md:p-8 lg:p-12 border-stone-400 dark:border-stone-600 md:border-b-0 hover:bg-scanlines">
        <HeadingH3 className="text-base group-hover:font-bold">
          Recent Discord {info.name} Chat Messages
        </HeadingH3>
        <div className="grid grid-cols-1 border-t bg-primary border-stone-400 dark:border-stone-600">
          <Discord />
        </div>
      </div>
      <div className="col-span-5 px-2 py-6 border-b lg:col-span-2 group lg:p-8 lg:p-12 border-stone-400 dark:border-stone-600 md:border-b-0 md:border-r hover:bg-scanlines">
        <HeadingH3 className="text-base group-hover:font-bold">
          Discord Widget
        </HeadingH3>

        <div className="patreon-container">
          <iframe
            src={info.widget}
            width="350"
            height="500"
            sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
          ></iframe>
        </div>

        <div className="items-center justify-center hidden p-0 lg:flex">
          <Image
            src="/screenshots-vertical/UnelectableAirwaves_Twitch-bird-silhouette-350x720.png"
            width={350}
            height={720}
            className="w-full"
            alt="UnelectableAirwaves Alien"
          />
        </div>
      </div>
    </div>
  );
};

export default RowDiscord;
