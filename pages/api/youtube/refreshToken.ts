import type { NextApiRequest, NextApiResponse } from "next";

import axios from "axios";
const { formatISO } = require("date-fns/formatISO");
// const parseISO = require("date-fns/parseISO");

const CLIENT_ID = process.env.NEXT_PUBLIC_YT_CLIENT_ID;
const CLIENT_SECRET = process.env.NEXT_PUBLIC_YT_CLIENT_SECRET;
const TOKEN_URL = "https://oauth2.googleapis.com/token";

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
  try {
    const token = process.env.NEXT_PUBLIC_YT_REFRESH_TOKEN;
    const params = {
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      grant_type: "refresh_token",
      refresh_token: token,
    };

    // const tokenResponse = await axios.post(
    //   TOKEN_URL,
    //   new URLSearchParams(params).toString(),
    //   {
    //     headers: {
    //       "Content-Type": "application/x-www-form-urlencoded",
    //     },
    //   }
    // );
    // const tokenResponse = await axios({
    //   method: "POST",
    //   url: TOKEN_URL,
    //   headers: {
    //     "Content-Type": "application/x-www-form-urlencoded",
    //   },
    //   data: new URLSearchParams(params).toString(),
    // });

    const tokenResponse = await axios({
      method: "POST",
      url: TOKEN_URL,
      params,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: {},
    });
    const result = tokenResponse.data;

    if (result.access_token) {
      const newToken = result.access_token;
      const updated = formatISO(new Date());
      if (result.refresh_token) {
        return {
          success: true,
          access_token: newToken,
          refresh_token: result.refresh_token,
          ...result,
        };
      } else {
        return { success: true, ...result };
      }
    } else {
      // If the response does not contain an access token, consider it a failure.
      return {
        success: false,
        error: "No access token returned from Youtube.",
      };
    }
  } catch (error) {
    // Log the error or handle it as needed
    console.error("Error refreshing YouTube token:", error);
    // Return or throw the error as needed
    return { success: false, error: error.message };
  }
};
