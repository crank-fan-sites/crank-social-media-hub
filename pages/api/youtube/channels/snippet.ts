import axios from "axios";

// const YT_AUTH_URL = "https://api.instagram.com/oauth/authorize";
// const YT_TOKEN_URL = "https://api.instagram.com/oauth/access_token";
// const domain = "https://national-easy-dingo.ngrok-free.app";
const token = process.env.NEXT_PUBLIC_YT_API_KEY;
const channelID = "UC7u4D4F6H1itVNM9wHe6PCw";
const channelUsername = "unelectableairwaves";

export default async function handler(req, res) {
  // return;
  // const channelId = req.query.channelId; // Assuming the channel ID is passed as a query parameter

  // if (!channelId) {
  //   return res.status(400).json({ error: "Channel ID is required" });
  // }

  const url = `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&forHandle=${channelUsername}&key=${token}`;

  try {
    const response = await axios.get(url);
    return res.status(200).json(response.data);
  } catch (error) {
    console.error("YouTube API error:", error.response?.data || error.message);
    return res
      .status(error.response?.status || 500)
      .json({ error: "Failed to fetch channel info" });
  }
}
