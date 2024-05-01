import type { NextPage } from "next";
import { useEffect, useState } from "react";
import axios from "axios";

import PatreonPost from "./patreon-post";

const PatreonLatestPosts: NextPage = () => {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    const url = `/api/patreon/posts`;
    axios
      .get(url)
      .then((response) => {
        console.log(response.data.data.length);
        // const postsArray = Object.values(response.data);
        setPosts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching Patreon posts:", error);
      });
  }, []);

  return (
    <div className="px-2 py-6 group md:p-1 lg:p-2">
      {posts &&
        posts.data.map((post, index) => (
          <PatreonPost
            key={index}
            title={post.attributes.title}
            content={post.attributes.content}
            embed_data={post.attributes.embed_data}
            embed_url={post.attributes.embed_url}
            published_at={post.attributes.published_at}
            url={post.attributes.url}
            is_paid={post.attributes.is_paid}
            is_public={post.attributes.is_public}
          />
        ))}
    </div>
  );
};

export default PatreonLatestPosts;
