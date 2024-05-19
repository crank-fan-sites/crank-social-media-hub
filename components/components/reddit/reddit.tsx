import type { NextPage } from "next";
import { useEffect, useState } from "react";
import axios from "axios";

import RedditPost from "@/components/components/reddit/reddit-post";
import CTAButton from "@/components/ui2/variants/reddit";

interface RedditProps {
  data: any[];
  buttons: { id: string; link: any }[];
  subreddit: string;
}

const Reddit: NextPage<RedditProps> = ({ subreddit, data, buttons }) => {
  const [extractedPosts, setExtractedPosts] = useState<any[]>([]);

  useEffect(() => {
    if (!subreddit) {
      return;
    }
    if (data && data.length > 0) {
      setExtractedPosts(data);
      return;
    }
    fetchRedditData(subreddit)
      .then((data) => {
        const posts = extractPostDetails(data);
        setExtractedPosts(posts);
      })
      .catch((error) => console.error(error));
  }, [subreddit, data]);

  return (
    <>
      {buttons &&
        buttons.length > 0 &&
        buttons.map((button: any) => (
          <CTAButton key={button.id} {...button.link} />
        ))}
      <div className="px-2 py-0 border-b group md:p-8 lg:p-2 border-stone-400 dark:border-stone-600 md:border-b-0 md:border-r bg-scanlines">
        {extractedPosts &&
          extractedPosts.length > 0 &&
          extractedPosts.map((post, index) => (
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
    </>
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
    before: string | null;
  };
}

async function fetchRedditData(
  subreddit: string | null
): Promise<RedditResponse> {
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
