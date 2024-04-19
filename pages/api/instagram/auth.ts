import axios from "axios";
import strapiAxios from "@/lib/strapiAxios";

const AUTH_URL = "https://api.instagram.com/oauth/authorize";
const TOKEN_URL = "https://api.instagram.com/oauth/access_token";
const domain = "https://national-easy-dingo.ngrok-free.app";

async function runStrapiAxios() {
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

async function postAccessToken(user_id, access_token) {
  try {
    const res = await strapiAxios().put("/social-media-instagram", {
      data: { user_id: user_id, api_access_token: access_token },
    });
    // things worked out.
    const res2 = await strapiAxios().get("/social-media-instagram");
    return res2.data.attributes;
  } catch (error) {
    console.log("didnt post up access token");
  }
}

export default async function handler(req, res) {
  const { api_client_id, api_client_secret, api_redirect_uri } =
    await runStrapiAxios();
  try {
    const code = req.query.code;
    if (code) {
      const data = {
        client_id: api_client_id,
        client_secret: api_client_secret,
        grant_type: "authorization_code",
        redirect_uri: api_redirect_uri,
        code: code.endsWith("#_") ? code.slice(0, -2) : code,
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

      // @TODO attempt to save this to STRAPI first or tell user to add it to STRAPI
      const bodyParsed = tokenResponse.data;
      const res2 = postAccessToken(bodyParsed.user_id, bodyParsed.access_token);
      res.status(200).json(res2);
      return;
      // }
    } else {
      const url = `${AUTH_URL}?client_id=${api_client_id}&redirect_uri=${api_redirect_uri}&scope=user_profile,user_media&response_type=code`;
      res.redirect(url);
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
