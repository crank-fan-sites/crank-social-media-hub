import type { NextApiRequest, NextApiResponse } from "next";

import strapiAxios from "@/lib/strapiAxios";

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
    const { channel_handle, highlighted_playlist } = await getStrapi(
      "/social-media-twitch"
    );
    res.status(200).json({ channel_handle, highlighted_playlist });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
}
