import strapiAxios from "@/lib/strapiAxios";

async function getStrapi(path) {
  try {
    const result = await strapiAxios().get(path);
    return result.data.data.attributes;
  } catch (error) {
    return { status: false };
  }
}

export default async function handler(req, res) {
  try {
    const { channel_id, playlist_id } = await getStrapi(
      "/social-media-youtube"
    );
    res.status(200).json({ channel_id, playlist_id });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
}
