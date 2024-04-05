import axios from "axios";

const { parseISO } = require("date-fns/parseISO");

const INSTAGRAM_API_URL = "https://graph.instagram.com/";
const token = process.env.NEXT_PUBLIC_INSTAGRAM_ACCESS_TOKEN;

export default async function handler(req, res) {
  const url = `${INSTAGRAM_API_URL}me/media`;

  const params = new URLSearchParams();
  const fields = [
    "id",
    "caption",
    "media_type",
    "media_url",
    "permalink",
    "thumbnail_url",
    "timestamp",
    "username",
  ];
  params.append("fields", fields.join(","));

  const response = await axios.get(`${url}?${params.toString()}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (response.status !== 200) {
    throw `API returned a ${response.status} status: ${response.statusText}`;
  }

  const { data } = response;

  let result = [];
  Object.values(data.data).forEach((item) => {
    const createdDate = parseISO(item.timestamp);

    const media = {
      id: item.id,
      date: createdDate.toISOString(),
      timestamp: createdDate.getTime(),
      type: "instagram",
      url: item.permalink,
      text: item.caption,
      picture: item.thumbnail_url,
    };

    if (item.media_type === "VIDEO") {
      media.video = {
        url: item.media_url,
        width: 600,
        heigh: 600,
      };
    } else {
      media.picture = item.media_url;
    }

    result.push(media);
    console.log("k", result.length);
  });

  res.status(200).json(result);
}
