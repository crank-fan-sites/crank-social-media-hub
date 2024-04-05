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
        // client_id: 1159665752108528,
        client_secret: process.env.NEXT_PUBLIC_INSTAGRAM_CLIENT_SECRET,
        grant_type: "authorization_code",
        redirect_uri: process.env.NEXT_PUBLIC_INSTAGRAM_AUTH_REDIRECT_URL,
        // code: "lala",
        code: code.endsWith("#_") ? code.slice(0, -2) : code,
      };
      // console.log("req code", req.query.code);
      // console.log("id", process.env.NEXT_PUBLIC_INSTAGRAM_CLIENT_ID);
      // console.log(data);
      const url = new URLSearchParams(data).toString();
      console.log("ONE", url);
      const tokenResponse = await axios.post(
        INSTAGRAM_TOKEN_URL,
        // `${domain}/api/instagram/receiveAuth`,
        url,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      // const tokenResponse = await axios.post(
      //   `${domain}/api/instagram/receiveAuth`,
      //   data
      // );
      console.log("TWO");

      // res.status(200).json({ msg: "success" });
      // return;

      // console.log("STATUS", tokenResponse.status);

      // if (tokenResponse.status === 200) {
      const bodyParsed = tokenResponse.data;
      // if (bodyParsed.access_token) {
      // console.log("DATA", bodyParsed);
      // console.log("count", Object.keys(bodyParsed).length);
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
