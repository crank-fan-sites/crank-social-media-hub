import { NextPage } from "next";
import { useEffect, useState } from "react";
import { HeadingH1 } from "@/components/typography";
import Alink from "@/components/layout/footer-link";
import { Button } from "@/components/ui/button";

const Links: NextPage = () => {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/header-links");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const thedata = await response.json();
        setLinks(thedata);
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
    <div className="">
      {links.map((link) => {
        return <Alink key={link.id} title={link.title} url={link.url} />;
      })}
    </div>
  );
};

export default Links;
