import axios from "axios";
import strapiAxios from "@/lib/strapiAxios";

const REFRESH_URL = "https://graph.instagram.com/refresh_access_token";

export default async function handler(req, res) {
  try {
    const result = await ensureAuth();
    res.status(200).json(result.attributes);
  } catch (error) {
    if (error.response) {
      res.status(error.response.status).json({
        msg: error.message,
        ...error.response.data,
      });
    } else {
      res.status(500).json({ msg: error.message });
    }
  }
}

async function getStrapi(path) {
  try {
    const result = await strapiAxios().get(path);
    return result.data.data.attributes;
  } catch (error) {
    return { status: false };
  }
}

const ensureAuth = async () => {
  const { api_access_token, last_updated } = await getStrapi(
    "/social-media-instagram"
  );

  const now = Math.floor(Date.now() / 1000);
  const deltaSeconds = now - last_updated;
  // 5 days = 432000, 1 day = 86400
  // if (deltaSeconds < 432000) {
  if (deltaSeconds < 86400) {
    return;
  }

  // If the access token is expiring in under 10 days
  return await updateAuth(api_access_token);
};

const updateAuth = async (accessToken: string) => {
  try {
    const params = {
      grant_type: "ig_refresh_token",
      access_token: accessToken,
    };

    const tokenResponse = await axios.get(REFRESH_URL, { params });
    const result = tokenResponse.data;

    if (result.access_token) {
      const newToken = result.access_token;
      // const updated = formatISO(new Date());
      // return { success: true, newToken: newToken };
      const updated = Math.floor(Date.now() / 1000);
      const response = await strapiAxios().put("/social-media-instagram", {
        data: {
          api_access_token: result.access_token,
          api_token_expiry: result.expires_in,
          last_updated: updated,
        },
      });
      return response.data.data;

      // @TODO Save to Strapi: access_token, expires_in after getting refreshed token
    } else {
      // If the response does not contain an access token, consider it a failure.
      throw new Error("No access token returned from Instagram.");
    }
  } catch (error) {
    // Log the error or handle it as needed
    console.error("Error refreshing Instagram token:", error.message);
    // Return or throw the error as needed
    throw error;
  }
};
