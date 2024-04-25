import axios from "axios";
import strapiAxios from "@/lib/strapiAxios";

async function getStrapi(path) {
  try {
    const result = await strapiAxios().get(path);
    return result.data.data;
  } catch (error) {
    return { status: false };
  }
}

export default async function handler(req, res) {
  try {
    const response = await getStrapi("/footer-links");
    const flattenedResponse = response.map((item) => ({
      id: item.id,
      ...item.attributes,
    }));
    res.status(200).json(flattenedResponse); // Filter out the undefined 'media_url' key
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
}
