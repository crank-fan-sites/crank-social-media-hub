import axios from "axios";
const formatISO = require("date-fns/formatISO");
// const parseISO = require("date-fns/parseISO");

const INSTAGRAM_TOKEN_URL = "https://graph.instagram.com/refresh_access_token";

export default async function handler(req, res) {
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
    const token = process.env.NEXT_PUBLIC_IG;
    const params = {
      grant_type: "ig_refresh_token",
      access_token: token,
    };

    const tokenResponse = await axios.get(INSTAGRAM_TOKEN_URL, { params });
    const result = tokenResponse.data;

    if (result.access_token) {
      const newToken = result.access_token;
      const updated = formatISO(new Date());
      return { success: true, newToken: newToken };
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
