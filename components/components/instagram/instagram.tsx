import type { NextPage } from "next";
import { useEffect, useState } from "react";

import InstagramPost from "@/components/components/instagram/instagram-post";

import CTAButton from "@/components/ui2/variants/instagram";

interface InstagramPostsProps {
  data?: any;
  buttons?: any;
}

const InstagramPosts: NextPage<InstagramPostsProps> = ({
  data = null,
  buttons,
}) => {
  const [media, setMedia] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
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

    if (!data) {
      fetchMedia();
    } else {
      setMedia(data);
      setLoading(false);
    }
  }, [data]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <>
      {buttons &&
        buttons.length > 0 &&
        buttons.map((button: any) => (
          <CTAButton key={button.id} {...button.link} />
        ))}
      <div className="flex flex-wrap -m-2 bg-scanlines">
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
    </>
  );
};

export default InstagramPosts;
