import axios from "axios";

const AUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth";
const TOKEN_URL = "https://oauth2.googleapis.com/token";
const DOMAIN = "https://national-easy-dingo.ngrok-free.app";
const CLIENT_ID = process.env.NEXT_PUBLIC_YT_CLIENT_ID;
const CLIENT_SECRET = process.env.NEXT_PUBLIC_YT_CLIENT_SECRET;
const REDIRECT_URI = process.env.NEXT_PUBLIC_YT_AUTH_REDIRECT_URL;
const scope = "https://www.googleapis.com/auth/youtube.readonly";

export default async function handler(req, res) {
  try {
    const code = req.query.code;
    if (code) {
      const data = {
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        grant_type: "authorization_code",
        redirect_uri: REDIRECT_URI,
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
      // res.status(200).json(bodyParsed.access_token);
      res.status(200).json(bodyParsed);
      return;
      // }
    } else {
      const url = `${AUTH_URL}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${scope}&response_type=code&access_type=offline`;
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
