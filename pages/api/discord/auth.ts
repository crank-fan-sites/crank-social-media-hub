import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const AUTH_URL = "https://discord.com/oauth2/authorize";
const PERMISSIONS = "1024";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const url = `${AUTH_URL}?client_id=${process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID}&permissions=${PERMISSIONS}&scope=bot`;
  res.redirect(url);
}
