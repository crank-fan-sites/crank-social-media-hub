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
    const { profile, video_creator, video_id } = await getStrapi(
      "/social-media-tik-tok"
    );
    res
      .status(200)
      .json({ profile, videoCreator: video_creator, videoId: video_id });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
}
