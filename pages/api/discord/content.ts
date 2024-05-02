import type { NextApiRequest, NextApiResponse } from "next";
import { getStrapi } from "@/lib/getStrapi";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { channel_name, channel_id, widget_url } = await getStrapi(
      "/social-media-discord"
    );
    res
      .status(200)
      .json({ name: channel_name, id: channel_id, widget: widget_url });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
}
