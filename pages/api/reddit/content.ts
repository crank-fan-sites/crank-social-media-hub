import type { NextApiRequest, NextApiResponse } from "next";

import { getStrapi } from "@/lib/getStrapi";

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
