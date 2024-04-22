import type { NextPage } from "next";
import { useEffect, useState } from "react";

import InstagramPost from "./instagram-post";

const InstagramPosts: NextPage = () => {
  const [media, setMedia] = useState([]);

  useEffect(() => {
    const fetchMedia = async () => {
      const response = await fetch("/api/instagram/media");
      const data = await response.json();
      setMedia(data);
    };

    fetchMedia();
  }, []);

  return (
    <div className="flex flex-wrap -m-2">
      {media.map((item, index) => (
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
