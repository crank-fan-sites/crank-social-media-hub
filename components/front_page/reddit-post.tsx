import React, { useEffect, useState } from "react";

import axios from "axios";
// import { promises as fs } from "fs";

const Reddit = (props: any) => {
  const {
    title,
    selftext,
    author,
    crosspost,
    ups,
    created,
    permalink,
    url,
    link_flair_type,
  } = props;

  return (
    <div>
      <h2>{title}</h2>
      <p>{selftext}</p>
      <p>Author: {author}</p>
      <p>
        created timestamp: {created} (will turn into a user friendly DateTime)
      </p>
      <p>upvotes: {ups}</p>
      <p>reddit link: {permalink}</p>
      <p>url: {url}</p>
      <p>link_flair_type: {link_flair_type}</p>
      {crosspost &&
        crosspost.map((cross, crossIndex) => (
          <div key={crossIndex}>
            <h3>Crosspost: {cross.title}</h3>
            {/* <p>{cross.selftext}</p> */}
            <p>Author: {cross.author}</p>
          </div>
        ))}
      <hr />
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
      crosspost: null,
    };

    // Check if the crosspost_parent_list exists and is not empty
    if (post.crosspost_parent_list && post.crosspost_parent_list.length > 0) {
      // Extract the same fields for the crosspost
      detail.crosspost = post.crosspost_parent_list.map((crosspost: any) => ({
        title: crosspost.title,
        selftext: crosspost.selftext,
        author: crosspost.author,
      }));
    }

    // Add the extracted details to the array
    extractedDetails.push(detail);
  }

  return extractedDetails;
}

export default Reddit;
