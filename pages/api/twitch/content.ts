import type { NextApiRequest, NextApiResponse } from "next";

import { getStrapi } from "@/lib/getStrapi";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { channel_handle, highlighted_playlist } = await getStrapi(
      "/social-media-twitch"
    );
    res.status(200).json({ channel_handle, highlighted_playlist });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
}
