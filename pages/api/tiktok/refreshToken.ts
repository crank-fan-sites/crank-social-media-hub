import type { NextApiRequest, NextApiResponse } from "next";

import axios from "axios";
import strapiAxios from "@/lib/strapiAxios";
import { getStrapi } from "@/lib/getStrapi";

const REFRESH_URL = "https://open.tiktokapis.com/v2/oauth/token/";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const result = await ensureAuth();
    res.status(200).json(result);
  } catch (error) {
    if (error.response) {
      res.status(error.response.status).json({
        msg: error.message,
        ...error.response.data,
      });
    } else {
      res.status(500).json({ msg: error.message });
    }
  }
}

const ensureAuth = async () => {
  const data = await getStrapi("/front-page?populate=tiktok");
  const { lastUpdated } = data.tiktok;

  const now = Math.floor(Date.now() / 1000);
  const deltaSeconds = now - lastUpdated;
  // 10 days = 864000, 5 days = 432000, 1 day = 86400
  if (deltaSeconds < 432000) {
    return data.tiktok;
  }
  // If the access token is expiring in under 1-10 days
  return await updateAuth(data.tiktok);
};

const updateAuth = async (data: any) => {
  try {
    const params = {
      client_key: process.env.NEXT_PUBLIC_TIKTOK_CLIENT_KEY,
      client_secret: process.env.NEXT_PUBLIC_TIKTOK_CLIENT_SECRET,
      grant_type: "refresh_token",
      refresh_token: data.refreshToken,
    };

    const tokenResponse = await axios.post(
      REFRESH_URL,
      new URLSearchParams(params).toString(),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    const result = tokenResponse.data;
    // console.log("Tiktok updateAuth is running 3", result);

    if (result.access_token) {
      const newToken = result.access_token;
      // const updated = formatISO(new Date());
      // return { success: true, newToken: newToken };
      const updated = Math.floor(Date.now() / 1000);
      const response = await strapiAxios().put("/front-page", {
        data: {
          tiktok: {
            ...data,
            accessToken: result.access_token,
            refreshToken: result.refresh_token,
            lastUpdated: updated,
          },
        },
      });
      return response.data.data;

      // @TODO Save to Strapi: access_token, expires_in after getting refreshed token
    } else {
      // If the response does not contain an access token, consider it a failure.
      throw new Error("No access token returned from Instagram.");
    }
  } catch (error) {
    // Log the error or handle it as needed
    console.error("Error refreshing Instagram token:", error.message);
    // Return or throw the error as needed
    throw error;
  }
};
