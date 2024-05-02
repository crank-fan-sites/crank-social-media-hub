import type { NextApiRequest, NextApiResponse } from "next";

import { getStrapiMultiple } from "@/lib/getStrapi";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const response = await getStrapiMultiple("/header-links");
    const flattenedResponse = response.map((item) => ({
      id: item.id,
      ...item.attributes,
    }));
    res.status(200).json(flattenedResponse);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
}
