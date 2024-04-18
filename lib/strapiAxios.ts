import axios from "axios";

const strapiAxios = () => {
  const strapiToken = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${strapiToken}`,
  };
  const req = {
    headers: headers,
    baseURL: process.env.NEXT_PUBLIC_STRAPI_API_URL,
  };

  return axios.create(req);
};

export default strapiAxios;
