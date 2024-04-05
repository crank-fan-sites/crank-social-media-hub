import type { NextApiRequest, NextApiResponse } from "next";

const PAGE_ID = "222881841792227";
const ACCESS_TOKEN = "your_access_token";
const APP_ID = "1441045280100752";
const APP_SECRET = "20bfca780d11ccd338358d9047ac323c";

async function getFacebookPosts(req: NextApiRequest, res: NextApiResponse) {
  const response = await fetch(
    `https://graph.facebook.com/${PAGE_ID}/posts?access_token=${APP_ID}|${APP_SECRET}`
  );
  const data = await response.json();

  if (response.ok) {
    res.status(200).json(data);
  } else {
    res.status(500).json({ error: "Failed to fetch data" });
  }
}

export default getFacebookPosts;
