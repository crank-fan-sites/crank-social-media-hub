import axios from "axios";
const formatISO = require("date-fns/formatISO");
import strapiAxios from "@/lib/strapiAxios";
// const parseISO = require("date-fns/parseISO");

const TOKEN_URL = "https://graph.instagram.com/access_token";
const REFRESH_URL = "https://graph.instagram.com/refresh_access_token";

export default async function handler(req, res) {
  const result = await ensureAuth();
  res.status(200).json(result);
}

async function getStrapi() {
  try {
    const res = await strapiAxios().get("/social-media-instagram");
    const {
      api_client_secret,
      api_access_token,
      last_updated,
      api_token_expiry,
    } = res.data.attributes;
    return {
      api_client_secret,
      api_access_token,
      last_updated,
      api_token_expiry,
    };
  } catch (error) {
    return { status: false };
  }
}

const ensureAuth = async () => {
  const {
    api_client_secret,
    api_access_token,
    last_updated,
    api_token_expiry,
  } = await getStrapi();

  // if (api_token_expiry) {
  //   const updated = parseISO(updated);
  //   const now = new Date().getTime();

  // maybe there is divide by 1000 here

  // @TODO this expects the api expiry token to be a timestamp in seconds for when this expires.
  // So if timestamp is for April 30 and it's April 22, subtracting expiry by current time
  // should yield a number under 10 days in seconds (864K)
  // So if the end number is above 864K, no need to refresh token

  //   const deltaSeconds = (api_token_expiry - now)
  //   // 10 days = 864000
  //   if (deltaSeconds > 864000) {
  //     return;
  //   }
  // }

  // If the access token is expiring in under 10 days
  return await updateAuth();
};

const exchangeShortForLongToken = async (shortLivedToken: string) => {
  try {
    const params = {
      grant_type: "ig_exchange_token",
      client_secret: process.env.INSTAGRAM_CLIENT_SECRET,
      access_token: shortLivedToken,
    };

    const response = await axios.get(TOKEN_URL, { params });
    const result = response.data;

    if (
      result.access_token &&
      result.token_type &&
      result.expires_in &&
      result.token_type == "bearer"
    ) {
      return {
        success: true,
        longLivedToken: result.access_token,
        expiresIn: result.expires_in,
      };
    } else {
      return {
        success: false,
        error: "Failed to exchange short-lived token for a long-lived token.",
      };
    }
  } catch (error) {
    console.error("Error exchanging short-lived token:", error);
    return { success: false, error: error.message };
  }
};

const updateAuth = async (accessToken) => {
  try {
    const params = {
      grant_type: "ig_refresh_token",
      access_token: accessToken,
    };

    const tokenResponse = await axios.get(REFRESH_URL, { params });
    const result = tokenResponse.data;

    if (result.access_token) {
      const newToken = result.access_token;
      const updated = formatISO(new Date());
      return { success: true, newToken: newToken };

      // @TODO Save to Strapi: access_token, expires_in after getting refreshed token
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
