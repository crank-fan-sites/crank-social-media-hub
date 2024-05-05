import type { NextApiRequest, NextApiResponse } from "next";

import axios from "axios";

const INSTAGRAM_API_URL = "https://graph.instagram.com/";
const token = process.env.NEXT_PUBLIC_INSTAGRAM_ACCESS_TOKEN;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const params = new URLSearchParams();
  const fields = ["id", "username", "media_count"];
  params.append("fields", fields.join(","));

  const response = await axios.get(
    `${INSTAGRAM_API_URL}me?${params.toString()}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (response.status !== 200) {
    throw `API returned a ${response.status} status: ${response.statusText}`;
  }

  const { data } = response;
  const user = {
    id: data.id,
    username: data.username,
    counts: {
      media: data.media_count || 0,
    },
    url: `https://instagram.com/${data.username}`,
  };
  res.status(200).json(user);
  // return user;
}
