import axios from "axios";

const INSTAGRAM_AUTH_URL = "https://api.instagram.com/oauth/authorize";
const INSTAGRAM_TOKEN_URL = "https://api.instagram.com/oauth/access_token";
const domain = "https://national-easy-dingo.ngrok-free.app";
// const this_url = "https://national-easy-dingo.ngrok-free.app/api/instagram/auth";

export default async function handler(req, res) {
  // if (req.method === "POST") {
  // Handle POST request
  // You can access the request body using req.body
  // console.log("req body", req.body);
  // }
  try {
    const code = req.query.code;
    if (code) {
      const data = {
        client_id: process.env.NEXT_PUBLIC_INSTAGRAM_CLIENT_ID,
        client_secret: process.env.NEXT_PUBLIC_INSTAGRAM_CLIENT_SECRET,
        grant_type: "authorization_code",
        redirect_uri: process.env.NEXT_PUBLIC_INSTAGRAM_AUTH_REDIRECT_URL,
        code: code.endsWith("#_") ? code.slice(0, -2) : code,
      };

      const tokenResponse = await axios.post(
        INSTAGRAM_TOKEN_URL,
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
      const url = `${INSTAGRAM_AUTH_URL}?client_id=${process.env.NEXT_PUBLIC_INSTAGRAM_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_INSTAGRAM_AUTH_REDIRECT_URL}&scope=user_profile,user_media&response_type=code`;
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
