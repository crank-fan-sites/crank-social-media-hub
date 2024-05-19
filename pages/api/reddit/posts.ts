import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

import { getStrapi } from "@/lib/getStrapi";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let subreddit = req.query.subreddit;

  if (!subreddit) {
    try {
      const reddit = await getStrapi("/front-page?populate=reddit");
      subreddit = reddit.reddit.subreddit;
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  }

  // Check if subreddit is a string and not empty
  if (typeof subreddit !== "string" || subreddit.trim() === "") {
    res.status(400).json({ msg: "Invalid subreddit value" });
    return;
  }

  try {
    const data = await fetchRedditData(subreddit);
    const posts = extractPostDetails(data);
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Reddit Integration -- error", details: error.message });
  }
}

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
  let extractedDetails = [];
  const children = posts.data.children || [];

  // Loop through the first 10 items in the children array
  for (let i = 0; i < Math.min(children.length, 10); i++) {
    const post = children[i].data;

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
