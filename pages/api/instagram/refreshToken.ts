import axios from "axios";
const formatISO = require("date-fns/formatISO");
// const parseISO = require("date-fns/parseISO");

const INSTAGRAM_TOKEN_URL = "https://graph.instagram.com/refresh_access_token";

const ensureAuth = async () => {
  // @TODO grab updated from pg database
  if (updated) {
    const updated = parseISO(updated);
    const now = new Date();
    const deltaSeconds = (now.getTime() - updated.getTime()) / 1000;
    //5 days
    if (deltaSeconds < 432000) {
      return;
    }
  }
  await updateAuth();
};

const updateAuth = async () => {
  const token = process.env.NEXT_PUBLIC_INSTAGRAM_ACCESS_TOKEN;
  const params = new URLSearchParams();
  params.append("grant_type", "ig_refresh_token");
  params.append("access_token", token);

  // const response = await fetch(`${INSTAGRAM_TOKEN_URL}?${params.toString()}`);
  // const result = await response.json();
  const result = { access_token: "123" };

  if (result.access_token) {
    const newToken = result.access_token;
    const updated = formatISO(new Date());
    // add to postgres db? @TODO use pg package? Can I easily add or update database?
    // @TODO update token in postgres db. Also the site name and number of the integration as there could be 2 IG accounts.

    // storeSettings(AWS, AWS_REGION, "instagram", settings);
  }
};

export default async function handler(req, res) {
  try {
    const code = req.query.code;
    if (code) {
      const tokenResponse = await axios.post(INSTAGRAM_AUTH_URL, {
        client_id: process.env.NEXT_PUBLIC_INSTAGRAM_CLIENT_ID,
        client_secret: process.env.NEXT_PUBLIC_INSTAGRAM_CLIENT_SECRET,
        grant_type: "authorization_code",
        redirect_uri: process.env.NEXT_PUBLIC_INSTAGRAM_AUTH_REDIRECT_URL,
        code: code,
      });

      if (tokenResponse.status === 200) {
        const bodyParsed = tokenResponse.data;
        if (bodyParsed.access_token) {
          res.status(200).json(bodyParsed);
          return;
        }
      }
    } else {
      const url = `${INSTAGRAM_TOKEN_URL}?client_id=${process.env.NEXT_PUBLIC_INSTAGRAM_CLIENT_ID}&redirect_uri=${process.env.INSTAGRAM_AUTH_REDIRECT_URL}&response_type=code`;
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
      res.status(500).json({ if: "request", req: error.request });
    } else {
      res
        .status(500)
        .json({ if: "else", msg: error.message, message: error.message });
    }
    console.error(error.config);
  }
}
