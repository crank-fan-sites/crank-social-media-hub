import type { NextApiRequest, NextApiResponse } from "next";

import axios from "axios";
import { getStrapi } from "@/lib/getStrapi";

const { parseISO } = require("date-fns/parseISO");

const INSTAGRAM_API_URL = "https://graph.instagram.com";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let apiAccessToken = req.query.token as string | undefined;

  if (!apiAccessToken) {
    try {
      const data = await getStrapi("/front-page?populate=instagram");
      const { api_access_token } = data.instagram;
      apiAccessToken = api_access_token;
    } catch (error) {
      console.error(
        "Failed to retrieve Instagram API access token from Strapi:",
        error
      );
      return res
        .status(500)
        .json({ error: "Failed to retrieve Instagram API access token" });
    }
  }

  const url = `${INSTAGRAM_API_URL}/me/media`;
  const params = new URLSearchParams();
  const fields = [
    "id",
    "caption",
    "media_type",
    "media_url",
    "permalink",
    "thumbnail_url",
    "timestamp",
    "username",
  ];
  params.append("fields", fields.join(","));

  try {
    const response = await axios.get(`${url}?${params.toString()}`, {
      headers: {
        Authorization: `Bearer ${apiAccessToken}`,
      },
    });

    if (response.status !== 200) {
      console.error(
        `Instagram API returned a ${response.status} status: ${response.statusText}`
      );
      return res.status(response.status).json({ error: response.statusText });
    }

    const { data } = response;
    const result = data.data.map((item: any) => {
      const createdDate = parseISO(item.timestamp);
      const media = {
        id: item.id,
        date: createdDate.toISOString(),
        timestamp: createdDate.getTime(),
        type: "instagram",
        url: item.permalink,
        text: item.caption,
        picture:
          item.media_type === "VIDEO" ? item.thumbnail_url : item.media_url,
        video:
          item.media_type === "VIDEO"
            ? { url: item.media_url, width: 600, height: 600 }
            : null,
      };
      return media;
    });

    res.status(200).json(result);
  } catch (error) {
    console.error("Failed to fetch Instagram media:", error);
    res.status(500).json({ error: "Failed to fetch Instagram media" });
  }
}
