import type { NextApiRequest, NextApiResponse } from "next";

import axios from "axios";
import strapiAxios from "@/lib/strapiAxios";
import { getStrapi } from "@/lib/getStrapi";

const REFRESH_URL = "https://www.patreon.com/api/oauth2/token";

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
  const data = await getStrapi("/front-page?populate=patreon");
  const { last_updated } = data.patreon;

  const now = Math.floor(Date.now() / 1000);
  const deltaSeconds = now - last_updated;
  // 10 days = 864000, 5 days = 432000, 1 day = 86400
  if (deltaSeconds < 86400) {
    return { status: false, data: data.patreon };
  }

  // If the access token is expiring in under 5-10 days
  return await updateAuth(data.patreon);
};

const updateAuth = async (data: any) => {
  try {
    const params = new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: data.refresh_token,
      client_id: data.client_id,
      client_secret: data.client_secret,
    });

    const tokenResponse = await axios.post(REFRESH_URL, params.toString(), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    const result = tokenResponse.data;

    if (result.access_token) {
      // const updated = formatISO(new Date());
      // return { success: true, newToken: newToken };
      const updated = Math.floor(Date.now() / 1000);
      const response = await strapiAxios().put("/front-page", {
        data: {
          patreon: {
            ...data,
            access_token: result.access_token,
            refresh_token: result.refresh_token,
            last_updated: updated,
          },
        },
      });
      return response.data.data;

      // @TODO Save to Strapi: access_token, expires_in after getting refreshed token
    } else {
      // If the response does not contain an access token, consider it a failure.
      throw new Error("No access token returned from Patreon.");
    }
  } catch (error) {
    // Log the error or handle it as needed
    console.error("Error refreshing Patreon token:", error.message);
    // Return or throw the error as needed
    throw error;
  }
};
