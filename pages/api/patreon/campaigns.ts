import type { NextApiRequest, NextApiResponse } from "next";

import axios from "axios";
import getStrapi from "@/lib/getStrapi";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const accessToken = (await getStrapi("/social-media-patreon")).access_token;
  const url = `https://www.patreon.com/api/oauth2/api/current_user/campaigns?include=campaigns&fields${encodeURIComponent(
    "["
  )}post${encodeURIComponent("]")}=id`;

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const campaigns = response.data.data;
    const campaignId = response.data.data[0].id; // Assuming the user has at least one campaign
    res
      .status(200)
      .json({ status: response.status, campaigns, firstCampaign: campaignId });
  } catch (error) {
    if (error.response) {
      res.status(error.response.status).json({
        if: "response",
        msg: error.message,
        ...error.response.data,
      });
    } else if (error.request) {
      res.status(500).json({ if: "request", req: error.request });
    } else {
      res
        .status(500)
        .json({ if: "else", msg: error.message, message: error.message });
    }
    console.error(error.config);
  }
}
