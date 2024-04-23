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
    const { channel_name, channel_id, widget_url } = await getStrapi(
      "/social-media-discord"
    );
    res
      .status(200)
      .json({ name: channel_name, id: channel_id, widget: widget_url });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
}
