import type { NextPage } from "next";
import { useEffect, useState } from "react";
import axios from "axios";

import PatreonPost from "./patreon-post";

const PatreonLatestPosts: NextPage = () => {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    // const url = `http://localhost:8000/functions/patreon/crank`;
    // fetch("/api/discordMessages")
    // .then((response) => response.json())
    // .then(setMessages);
    const url = `/api/patreonAPI`;

    axios
      .get(url)
      .then((response) => {
        console.log("wtf1");
        console.log(response.data.data.length);
        // const postsArray = Object.values(response.data);
        setPosts(response.data);
      })
      .catch((error) => {
        console.log("wtf2");
        console.error("Error fetching Patreon posts:", error);
      });
    console.log("wtf99");
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <div className="px-2 py-6 group md:p-8 lg:p-12">
      {posts &&
        // <></>
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
