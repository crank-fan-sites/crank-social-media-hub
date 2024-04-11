import axios from "axios";

export default async function handler(req, res) {
  const accessToken = process.env.NEXT_PUBLIC_PATREON_ACCESS_TOKEN;
  const campaignId = process.env.NEXT_PUBLIC_PATREON_CAMPAIGN_ID;
  const url = `https://www.patreon.com/api/oauth2/v2/campaigns/${campaignId}/posts?fields${encodeURIComponent(
    "["
  )}post${encodeURIComponent(
    "]"
  )}=title,content,is_paid,is_public,published_at,url,embed_data,embed_url,app_id,app_status`;

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    res.status(200).json({ status: response.status, ...response.data });
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
