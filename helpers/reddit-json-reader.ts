import axios from "axios";
import { promises as fs } from "fs";

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

// async function fetchRedditData(subreddit: string): Promise<RedditResponse> {
//   const url = `https://www.reddit.com/r/${subreddit}.json`;
//   try {
//     const response = await axios.get<RedditResponse>(url);
//     return response.data;
//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       throw new Error(`Axios error: ${error.message}`);
//     } else {
//       throw new Error(`Unexpected error: ${error}`);
//     }
//   }
// }

// // Example usage
// const subreddit = "unelectableairwaves";
// fetchRedditData(subreddit)
//   .then((data) => console.log(data))
//   .catch((error) => console.error(error));

async function readRedditJsonFromFile(
  fileName: string
): Promise<RedditResponse> {
  try {
    const filePath = `./${fileName}`;
    const fileContents = await fs.readFile(filePath, "utf-8");
    const jsonData: RedditResponse = JSON.parse(fileContents);
    return jsonData;
  } catch (error) {
    throw new Error(`Failed to read JSON from file: ${error}`);
  }
}

// Example usage
let the_json = null;
const fileName = "reddit-pretty.json";
readRedditJsonFromFile(fileName)
  .then((data) => {
    console.log(data);
    the_json = data;
  })
  .catch((error) => console.error(error));

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

// Example usage
// Assuming `the_json` is your RedditResponse object
const extractedPosts = extractPostDetails(the_json);
console.log(extractedPosts);

// title
// selftext
// author
// link_flair_type
// permalink (only the /r/path)
// url (this is the actual URL, only the /r/path when a reddit post)
// ups
// created or create_utc

// possible sometimes: crosspost_parent_list which then has the same stuff

// link_flair_text
