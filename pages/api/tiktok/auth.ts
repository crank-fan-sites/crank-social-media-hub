import type { NextApiRequest, NextApiResponse } from "next";

import axios from "axios";
import { getStrapi } from "@/lib/getStrapi";
import strapiAxios from "@/lib/strapiAxios";

const AUTH_URL = "https://www.tiktok.com/v2/auth/authorize/";
const TOKEN_URL = "https://open.tiktokapis.com/v2/oauth/token/";
const LONG_LIVED_TOKEN_URL = "https://open.tiktokapis.com/v2/oauth/token/";
const domain = "https://national-easy-dingo.ngrok-free.app";

function firstOAuthStep(clientKey: string, redirectUri: string) {
  const csrfState = Math.random().toString(36).substring(2);
  return `${AUTH_URL}?client_key=${clientKey}&redirect_uri=${redirectUri}&scope=user.info.basic,video.list&response_type=code&state=${csrfState}`;
}

async function secondOAuthAccessTokenStep(
  clientKey,
  clientSecret,
  redirectUri,
  authCode
) {
  try {
    const code = decodeURI(authCode);
    const params = {
      client_key: clientKey,
      client_secret: clientSecret,
      grant_type: "authorization_code",
      redirect_uri: redirectUri,
      code: code,
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
async function postLongLivedToken(userId, accessToken, refreshToken, pkg) {
  try {
    const updated = Math.floor(Date.now() / 1000);

    const response = await strapiAxios().put("/front-page", {
      data: {
        tiktok: {
          ...pkg,
          // user_id: String(userId),
          accessToken: accessToken,
          refreshToken: refreshToken,
          lastUpdated: updated,
        },
      },
    });
    // things worked out.
    console.log("postShortLivedToken put", response.data.data.attributes);
    return response.data.data;
  } catch (error) {
    console.error(
      "ERR didnt post up access token",
      { method: "postLongLivedToken" },
      error.message
    );
    throw error;
  }
}

const exchangeShortForLongToken = async (
  clientKey: string,
  clientSecret: string,
  refreshToken: string
) => {
  try {
    const params = {
      client_key: clientKey,
      client_secret: clientSecret,
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    };

    const tokenResponse = await axios.post(
      LONG_LIVED_TOKEN_URL,
      new URLSearchParams(params).toString(),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    const result = tokenResponse.data;

    if (
      result.access_token &&
      result.token_type &&
      result.expires_in &&
      result.token_type == "Bearer"
    ) {
      return {
        success: true,
        openId: result.open_id,
        accessToken: result.access_token,
        refreshToken: result.refresh_token,
        expiresIn: result.expires_in,
        refreshExpiresIn: result.refresh_expires_in,
      };
    } else {
      console.error(
        { method: "exchangeShortForLongToken else" },
        {
          message:
            "Failed to exchange short-lived token for a long-lived token",
        }
      );
      console.error(result);
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
    const result = await getStrapi("/front-page?populate=tiktok");
    // const { api_client_id, api_client_secret, api_redirect_uri } = result.instagram;
    const clientKey = process.env.NEXT_PUBLIC_TIKTOK_CLIENT_KEY;
    const clientSecret = process.env.NEXT_PUBLIC_TIKTOK_CLIENT_SECRET;
    const redirectUri = process.env.NEXT_PUBLIC_TIKTOK_AUTH_REDIRECT_URL;
    const pkg = result.tiktok;

    const code = req.query.code;
    if (code) {
      const tokenResponse = await secondOAuthAccessTokenStep(
        clientKey,
        clientSecret,
        redirectUri,
        code
      );

      console.log("AH1", tokenResponse);
      // return;

      // 3rd step -- refresh access token using refresh token
      const finalRes = await exchangeShortForLongToken(
        clientKey,
        clientSecret,
        tokenResponse.refresh_token
      );
      console.log("AH2", finalRes);

      const shortLivedRes = await postLongLivedToken(
        finalRes.openId,
        finalRes.accessToken,
        finalRes.refreshToken,
        pkg
      );

      res.status(200).json(shortLivedRes);
      return;
    } else {
      res.redirect(firstOAuthStep(clientKey, redirectUri));
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
