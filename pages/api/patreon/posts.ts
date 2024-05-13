import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { getStrapi } from "@/lib/getStrapi";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let { campaignId, accessToken } = req.query;

  if (!campaignId || !accessToken) {
    try {
      const data = await getStrapi("/social-media-patreon");
      campaignId = campaignId || data.campaign_id;
      accessToken = accessToken || data.access_token;
    } catch (error) {
      console.error(
        "Failed to retrieve campaign ID or access token from Strapi:",
        error
      );
      return res
        .status(500)
        .json({ error: "Failed to retrieve necessary Patreon credentials" });
    }
  }

  const url = `https://www.patreon.com/api/oauth2/v2/campaigns/${campaignId}/posts?fields${encodeURIComponent(
    "["
  )}post${encodeURIComponent(
    "]"
  )}=title,content,is_paid,is_public,published_at,url,embed_data,embed_url,app_id,app_status`;

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.status !== 200) {
      console.error(
        `Patreon API Error -- returned a ${response.status} status: ${response.statusText}`
      );
      return res
        .status(response.status)
        .json({
          error: response.statusText
            ? response.statusText
            : "Patreon API Error not status 200",
        });
    }

    res.status(200).json({ status: response.status, ...response.data });
  } catch (error) {
    console.error("Failed to fetch Patreon posts:", error);
    if (error.response) {
      res.status(error.response.status).json({
        error: "API response error",
        details: error.response.data,
      });
    } else if (error.request) {
      res
        .status(500)
        .json({
          error: "Patreon API -- No response received from Patreon API",
          details: error.request,
        });
    } else {
      res
        .status(500)
        .json({
          error: "Patreon API -- Unexpected error occurred",
          details: error.message,
        });
    }
  }
}
