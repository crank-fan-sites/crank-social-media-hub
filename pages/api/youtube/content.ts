import type { NextApiRequest, NextApiResponse } from "next";

import { getStrapi } from "@/lib/getStrapi";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { channel_id, playlist_id } = await getStrapi(
      "/social-media-youtube"
    );
    res.status(200).json({ channel_id, playlist_id });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
}
