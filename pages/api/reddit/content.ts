import strapiAxios from "@/lib/strapiAxios";
import type { NextApiRequest, NextApiResponse } from "next";

async function getStrapi(path) {
  try {
    const result = await strapiAxios().get(path);
    return result.data.data.attributes;
  } catch (error) {
    return { status: false };
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { subreddit } = await getStrapi("/social-media-reddit");
    res.status(200).json({ subreddit });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
}
