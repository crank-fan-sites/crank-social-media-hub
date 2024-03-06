import React, { useEffect, useState } from "react";
import axios from "axios";

import PatreonPost from "./patreon-post";

const PatreonLatestPosts = () => {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    // const url = `http://localhost:8000/functions/patreon/crank`;
    const url = `https://ats-exp-crank.atextbooksituation.com/functions/patreon/crank`;

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
    <div className="group py-6 px-2 md:p-8 lg:p-12 border-b border-stone-400 dark:border-stone-600 md:border-b-0 md:border-r hover:bg-scanlines hover:bg-accent">
      {posts &&
        // <></>
        posts.data.map((post, index) => (
          <PatreonPost
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
