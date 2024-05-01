import type { NextApiRequest, NextApiResponse } from "next";

import axios from "axios";
const formatISO = require("date-fns/formatISO");
// const parseISO = require("date-fns/parseISO");

const TOKEN_URL = "https://open.tiktokapis.com/v2/oauth/token/";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const result = await ensureAuth();
  res.status(200).json(result);
}

const ensureAuth = async () => {
  // @TODO grab updated from pg database
  // if (updated) {
  //   const updated = parseISO(updated);
  //   const now = new Date();
  //   const deltaSeconds = (now.getTime() - updated.getTime()) / 1000;
  //   //5 days
  //   if (deltaSeconds < 432000) {
  //     return;
  //   }
  // }
  return await updateAuth();
};

const updateAuth = async () => {
  const clientKey = process.env.NEXT_PUBLIC_TIKTOK_CLIENT_KEY;
  const clientSecret = process.env.NEXT_PUBLIC_TIKTOK_CLIENT_SECRET;
  try {
    const token = process.env.NEXT_PUBLIC_IG;
    const params = {
      client_key: clientKey,
      client_secret: clientSecret,
      grant_type: "refresh_token",
      access_token: token,
    };

    const tokenResponse = await axios.post(
      TOKEN_URL,
      new URLSearchParams(params).toString(),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    const result = tokenResponse.data;

    if (result.access_token) {
      // result keys that matter
      // result = { open_id (user id), scope (that user agreed to), access_token, expires_in, refresh_token, refresh_expires_in}
      // const updated = formatISO(new Date());
      return { success: true, ...result };
    } else {
      // If the response does not contain an access token, consider it a failure.
      return {
        success: false,
        error: "No access token returned from Instagram.",
      };
    }
  } catch (error) {
    // Log the error or handle it as needed
    console.error("Error refreshing Instagram token:", error);
    // Return or throw the error as needed
    return { success: false, error: error.message };
  }
};
