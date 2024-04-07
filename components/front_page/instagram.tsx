import type { NextPage } from "next";
import { useEffect, useState } from "react";

import InstagramPost from "./instagram-post";

const InstagramPosts: NextPage = () => {
  const [media, setMedia] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchMedia = async () => {
      const response = await fetch("/api/instagram/media");
      const data = await response.json();
      setMedia(data);
    };

    fetchMedia();
  }, []);

  return (
    <div>
      {media.map((item, index) => (
        <div>
          <InstagramPost
            date={item.date}
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
