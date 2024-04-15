import axios from "axios";

const AUTH_URL = "https://www.tiktok.com/v2/auth/authorize/";
const TOKEN_URL = "https://api.instagram.com/oauth/access_token";
const domain = "https://national-easy-dingo.ngrok-free.app";

export default async function handler(req, res) {
  const clientKey = process.env.NEXT_PUBLIC_TIKTOK_CLIENT_KEY;
  const clientSecret = process.env.NEXT_PUBLIC_TIKTOK_CLIENT_SECRET;
  const redirectUri = process.env.NEXT_PUBLIC_TIKTOK_AUTH_REDIRECT_URL;

  try {
    const code = req.query.code;
    if (code) {
      const data = {
        client_key: clientKey,
        client_secret: clientSecret,
        grant_type: "authorization_code",
        redirect_uri: redirectUri,
        code: decodeURI(code),
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
      // res.status(200).json(bodyParsed.access_token);
      res.status(200).json(bodyParsed);
      return;
      // }
    } else {
      const url = `${AUTH_URL}?client_key=${clientKey}&redirect_uri=${redirectUri}&scope=user_profile,user_media&response_type=code&state=classic`;
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
