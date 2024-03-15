import type { NextPage } from "next";
import { useEffect, useState } from "react";

import axios from "axios";
// import { promises as fs } from "fs";

import RedditPost from "./reddit-post";

const Reddit: NextPage = (props: any) => {
  const [extractedPosts, setExtractedPosts] = useState<any[]>([]);

  useEffect(() => {
    const subreddit = "UnelectableAirwaves"; // Replace with your desired subreddit
    fetchRedditData(subreddit)
      .then((data) => {
        const posts = extractPostDetails(data);
        setExtractedPosts(posts);
      })
      .catch((error) => console.error(error));
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <div className="px-2 py-6 border-b group md:p-8 lg:p-12 border-stone-400 dark:border-stone-600 md:border-b-0 md:border-r hover:bg-scanlines">
      {extractedPosts.map((post, index) => (
        <RedditPost
          key={index}
          title={post.title}
          selftext={post.selftext}
          author={post.author}
          crosspost={post.crosspost}
          ups={post.ups}
          created={post.created}
          permalink={post.permalink}
          url={post.url}
          link_flair_type={post.link_flair_path}
        />
      ))}
    </div>
  );
};

interface RedditResponse {
  kind: string;
  data: {
    after: string | null;
    dist: number;
    modhash: string;
    geo_filter: null | string;
    children: Array<{
      kind: string;
      data: object;
    }>;
  };
}

async function fetchRedditData(subreddit: string): Promise<RedditResponse> {
  const url = `https://www.reddit.com/r/${subreddit}.json`;
  try {
    const response = await axios.get<RedditResponse>(url);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Axios error: ${error.message}`);
    } else {
      throw new Error(`Unexpected error: ${error}`);
    }
  }
}

function extractPostDetails(posts: any): any[] {
  // Initialize an empty array to hold the extracted details
  let extractedDetails = [];

  // Loop through the first 10 items in the children array
  for (let i = 0; i < Math.min(posts.data.children.length, 10); i++) {
    const post = posts.data.children[i].data;

    // Extract the required fields from the current post
    let detail = {
      title: post.title,
      selftext: post.selftext,
      author: post.author,
      ups: post.ups,
      created: post.created,
      permalink: post.permalink,
      url: post.url,
      link_flair_type: post.link_flair_type,
      crosspost: null,
    };

    // Check if the crosspost_parent_list exists and is not empty
    if (post.crosspost_parent_list && post.crosspost_parent_list.length > 0) {
      // Extract the same fields for the crosspost
      detail.crosspost = post.crosspost_parent_list.map((crosspost: any) => ({
        title: crosspost.title,
        selftext: crosspost.selftext,
        author: crosspost.author,
        ups: crosspost.ups,
        created: crosspost.created,
        permalink: crosspost.permalink,
        url: post.url,
        link_flair_type: crosspost.link_flair_type,
      }));
    }

    // Add the extracted details to the array
    extractedDetails.push(detail);
  }

  return extractedDetails;
}

export default Reddit;
