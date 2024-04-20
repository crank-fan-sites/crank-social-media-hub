import axios from "axios";
import strapiAxios from "@/lib/strapiAxios";

const AUTH_URL = "https://api.instagram.com/oauth/authorize";
const TOKEN_URL = "https://api.instagram.com/oauth/access_token";
const LONG_LIVED_TOKEN_URL = "https://graph.instagram.com/access_token";
const domain = "https://national-easy-dingo.ngrok-free.app";

async function getStrapi() {
  try {
    const res = await strapiAxios().get("/social-media-instagram");
    const { api_client_id, api_client_secret, api_redirect_uri } =
      res.data.attributes;
    return {
      api_client_id,
      api_client_secret,
      api_redirect_uri,
    };
  } catch (error) {
    return { status: false };
  }
}

function firstOAuthStep(api_client_id, api_redirect_uri) {
  const firstUrl = `${AUTH_URL}?client_id=${api_client_id}&redirect_uri=${api_redirect_uri}&scope=user_profile,user_media&response_type=code`;
  res.redirect(firstUrl);
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
    res.status(500).json({ if: "request", req: error.message | "" });
  }
}

// This doesnt have to be saved or used. Getting the long lived access token. Can put user id then if need be
// @TODO make this the one after getting the long lived
async function postShortLivedToken(userId, accessToken, expiresIn) {
  try {
    const updated = Math.floor(Date.now() / 1000);

    const res = await strapiAxios().put("/social-media-instagram", {
      data: {
        user_id: userId,
        api_access_token: accessToken,
        api_token_expiry: expiresIn,
        last_updated: updated,
      },
    });
    // things worked out.
    return true;
  } catch (error) {
    res.status(500).json({ status: failure, message: error.message });
    console.log("didnt post up access token");
  }
}

const exchangeShortForLongToken = async (
  clientSecret: string,
  shortLivedToken: string
) => {
  try {
    // const params = {
    //   grant_type: "ig_exchange_token",
    //   client_secret: process.env.INSTAGRAM_CLIENT_SECRET,
    //   access_token: shortLivedToken,
    // };
    // const response = await axios.get(TOKEN_URL, { params });
    const url = `${TOKEN_URL}?grant_type=ig_exchange_token&client_secret=${clientSecret}&access_token=${shortLivedToken}`;
    const response = await axios.get(url);
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

export default async function handler(req, res) {
  const { api_client_id, api_client_secret, api_redirect_uri } =
    await getStrapi();
  try {
    const code = req.query.code;
    if (code) {
      // const data = {
      //   client_id: api_client_id,
      //   client_secret: api_client_secret,
      //   grant_type: "authorization_code",
      //   redirect_uri: api_redirect_uri,
      //   code: code.endsWith("#_") ? code.slice(0, -2) : code,
      // };

      // const tokenResponse = await axios.post(
      //   TOKEN_URL,
      //   new URLSearchParams(data).toString(),
      //   {
      //     headers: {
      //       "Content-Type": "application/x-www-form-urlencoded",
      //     },
      //   }
      // );
      const tokenResponse = await secondOAuthAccessTokenStep(
        api_client_id,
        api_client_secret,
        api_redirect_uri,
        code
      );
      console.log("2nd", tokenResponse);

      // @TODO take the data and push to exchange for long term token
      const firstLongLiveTokenRes = await exchangeShortForLongToken(
        api_client_secret,
        tokenResponse.access_token
      );
      console.log("3rd", firstLongLiveTokenRes);

      // const { success, longLivedToken, expiresIn } = firstLongLiveTokenRes;
      // success: true,
      // longLivedToken: result.access_token,
      // expiresIn: result.expires_in,

      // verify thiss is
      const shortLivedRes = await postShortLivedToken(
        tokenResponse.user_id,
        firstLongLiveTokenRes.longLivedToken,
        firstLongLiveTokenRes.expiresIn
      );
      // run long term exchange token method
      // put the changes up to the server: api_token_expiry, last_updated, api_access_token
      const res2 = await strapiAxios().get("/social-media-instagram");
      res.status(200).json(res2.data.attributes);
      return;
      // }
    } else {
      firstOAuthStep(api_client_id, api_redirect_uri);
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
    console.error(error.config);
  }
}
