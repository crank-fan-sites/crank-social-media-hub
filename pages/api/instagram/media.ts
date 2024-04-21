import axios from "axios";
import strapiAxios from "@/lib/strapiAxios";

const { parseISO } = require("date-fns/parseISO");

const INSTAGRAM_API_URL = "https://graph.instagram.com";

async function getStrapi(path) {
  try {
    const result = await strapiAxios().get(path);
    return result.data.data.attributes;
  } catch (error) {
    return { status: false };
  }
}

export default async function handler(req, res) {
  let apiAccessToken = null;
  try {
    const { api_access_token } = await getStrapi("/social-media-instagram");
    apiAccessToken = api_access_token;
  } catch (error) {
    throw `Strapi get IG not working. | ${error.status} status. msg: ${error.message}`;
  }

  const url = `${INSTAGRAM_API_URL}/me/media`;
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
      Authorization: `Bearer ${apiAccessToken}`,
    },
  });
  if (response.status !== 200) {
    throw `API returned a ${response.status} status: ${response.statusText}`;
  }

  const { data } = response;

  const result: any[] = [];
  Object.values(data.data).forEach((item: any) => {
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
  });

  res.status(200).json(result);
}
