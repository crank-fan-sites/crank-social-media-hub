import type { NextApiRequest, NextApiResponse } from "next";

import { getStrapiMultiple } from "@/lib/getStrapi";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const response = await getStrapiMultiple("/social-media-soundclouds");
    const flattenedResponse = response.map((item) => ({
      id: item.id,
      ...item.attributes,
      url: item.attributes.media_url,
    }));
    res
      .status(200)
      .json(flattenedResponse.map(({ media_url, ...rest }) => rest)); // Filter out the undefined 'media_url' key
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
}
