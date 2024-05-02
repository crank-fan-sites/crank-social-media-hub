import type { NextApiRequest, NextApiResponse } from "next";

import { getStrapi } from "@/lib/getStrapi";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { profile, dark_mode, widget_height } = await getStrapi(
      "/social-media-twitter"
    );
    const darkMode = dark_mode ?? false;
    const widgetHeight = widget_height ?? 800;
    res.status(200).json({ profile, darkMode, widgetHeight });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
}
