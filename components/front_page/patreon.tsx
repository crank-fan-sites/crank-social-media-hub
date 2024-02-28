import React, { useEffect, useState } from "react";
import axios from "axios";

import PatreonPost from "./patreon-post";

const PatreonLatestPost = () => {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    const accessToken = "9iou4_M2_FhYbAji7AiYQbG8vQhbdIMBICMEe_z5ZRs"; // Replace 'access_token_variable' with your actual access token
    const campaignId = "10130297"; // Example campaign ID
    const url = `https://www.patreon.com/api/oauth2/v2/campaigns/${campaignId}/posts?fields[post]=title,content,is_paid,is_public,published_at,url,embed_data,embed_url,app_id,app_status`;

    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching Patreon posts:", error);
      });
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <div className="group py-6 px-2 md:p-8 lg:p-12 border-b border-stone-400 dark:border-stone-600 md:border-b-0 md:border-r hover:bg-scanlines hover:bg-accent">
      {posts.map((post, index) => (
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

export default PatreonLatestPost;
