import type { NextApiRequest, NextApiResponse } from "next";

import axios from "axios";
import { getStrapi } from "@/lib/getStrapi";
import strapiAxios from "@/lib/strapiAxios";

const AUTH_URL = "https://api.instagram.com/oauth/authorize";
const TOKEN_URL = "https://api.instagram.com/oauth/access_token";
const LONG_LIVED_TOKEN_URL = "https://graph.instagram.com/access_token";

function firstOAuthStep(clientId: string, redirectUri: string) {
  return `${AUTH_URL}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=user_profile,user_media&response_type=code`;
}

async function secondOAuthAccessTokenStep(
  apiClientId,
  apiClientSecret,
  apiRedirectUri,
  authCode
) {
  try {
    const data = {
      client_id: apiClientId,
      client_secret: apiClientSecret,
      grant_type: "authorization_code",
      redirect_uri: apiRedirectUri,
      code: authCode.endsWith("#_") ? authCode.slice(0, -2) : authCode,
    };

    const tokenResponse = await axios.post(
      TOKEN_URL,
      new URLSearchParams(data).toString(),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    return tokenResponse.data;
  } catch (error) {
    console.error(
      "ERR",
      { method: "secondOAuthAccessTokenStep" },
      { message: error.message }
    );
    throw error;
  }
}

// This doesnt have to be saved or used. Getting the long lived access token. Can put user id then if need be
// @TODO make this the one after getting the long lived
async function postLongLivedToken(userId, accessToken, expiresIn, pkg) {
  try {
    const updated = Math.floor(Date.now() / 1000);

    const response = await strapiAxios().put("/front-page", {
      data: {
        instagram: {
          ...pkg,
          // user_id: String(userId),
          api_access_token: accessToken,
          last_updated: updated,
        },
      },
    });
    // things worked out.
    console.log("postShortLivedToken put", response.data.data.attributes);
    return response.data.data;
  } catch (error) {
    console.error(
      "ERR didnt post up access token",
      { method: "postLongtLivedToken" },
      error.message
    );
    throw error;
  }
}

const exchangeShortForLongToken = async (
  clientSecret: string,
  shortLivedToken: string
) => {
  try {
    const url = `${LONG_LIVED_TOKEN_URL}?grant_type=ig_exchange_token&client_secret=${clientSecret}&access_token=${shortLivedToken}`;
    const response = await axios.get(url);
    const result = response.data;
    console.log("exchangeShortForLongToken result", result);

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
      console.error(
        { method: "exchangeShortForLongToken else" },
        {
          message:
            "Failed to exchange short-lived token for a long-lived token",
        }
      );
      throw new Error(
        "Failed to exchange short-lived token for a long-lived token"
      );
    }
  } catch (error) {
    console.error(
      "ERR exchanging short-lived token:",
      { method: "exchangeShortForLongToken catch" },
      error.message
    );
    throw error;
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const result = await getStrapi("/front-page?populate=instagram");
    const { api_client_id, api_client_secret, api_redirect_uri } =
      result.instagram;
    const pkg = result.instagram;

    const code = req.query.code;
    if (code) {
      const tokenResponse = await secondOAuthAccessTokenStep(
        api_client_id,
        api_client_secret,
        api_redirect_uri,
        code
      );

      const firstLongLiveTokenRes = await exchangeShortForLongToken(
        api_client_secret,
        tokenResponse.access_token
      );

      const shortLivedRes = await postLongLivedToken(
        tokenResponse.user_id,
        firstLongLiveTokenRes.longLivedToken,
        firstLongLiveTokenRes.expiresIn,
        pkg
      );

      res.status(200).json(shortLivedRes);
      return;
    } else {
      res.redirect(firstOAuthStep(api_client_id, api_redirect_uri));
      return;
    }
  } catch (error) {
    if (error.response) {
      res.status(error.response.status).json({
        if: "response",
        msg: error.message,
        ...error.response.data,
      });
    } else if (error.request) {
      res.status(500).json({ if: "request", req: error.message });
    } else {
      res.status(500).json({ if: "else", msg: error.message });
    }
    console.error("ERR", error.config);
  }
}
