import type { NextPage } from "next";
import { useEffect, useState } from "react";

import InstagramPost from "./instagram-post";

const InstagramPosts: NextPage = () => {
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const response = await fetch("/api/instagram/media");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const thedata = await response.json();
        setMedia(thedata);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMedia();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <div className="flex flex-wrap -m-2">
      {media.length > 0 &&
        media.map((item, index) => (
          <div key={index} className="w-full p-2 sm:w-1/2 md:w-1/3 lg:w-1/4">
            <InstagramPost
              url={item.url}
              text={item.text}
              picture={item.picture}
            />
          </div>
        ))}
    </div>
  );
};

export default InstagramPosts;
