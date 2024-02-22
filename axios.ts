import axios from 'axios';
const strapiToken = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

const useAxios = () => {
  return axios.create({
    baseURL: process.env.NEXT_PUBLIC_STRAPI_API_URL,
    timeout: 5000,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${strapiToken}`,
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
};

export default useAxios;
