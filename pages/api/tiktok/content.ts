import type { NextApiRequest, NextApiResponse } from "next";

import { getStrapi } from "@/lib/getStrapi";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { profile, video_creator, video_id } = await getStrapi(
      "/social-media-tik-tok"
    );
    res
      .status(200)
      .json({ profile, videoCreator: video_creator, videoId: video_id });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
}
