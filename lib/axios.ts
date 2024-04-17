import { useState, useEffect } from "react";
import axios from "axios";

// axios.defaults.baseURL = process.env.NEXT_PUBLIC_STRAPI_API_URL;

interface StrapiAxiosParams {
  path: string;
  // id: number | string;
  method: "get" | "post" | "put" | "delete";
  body?: any;
}

const useStrapiAxios = ({ path, method, body = null }: StrapiAxiosParams) => {
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState<any>("");
  const [loading, setLoading] = useState<boolean>(true);
  const strapiToken = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${strapiToken}`,
  };
  const req = {
    method: method,
    headers: headers,
    baseURL: process.env.NEXT_PUBLIC_STRAPI_API_URL,
    url: path,
    data: { data: body },
  };
  const fetchData = async () => {
    try {
      const result = await axios(req);
      setResponse(result.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [method, path, body]);

  return { response, error, loading };
};

const useGetStrapiAxios = ({ path }: { path: string }) => {
  return useStrapiAxios({ method: "get", path });
};

const useDeleteStrapiAxios = ({ path }: { path: string }) => {
  return useStrapiAxios({ method: "delete", path });
};

const usePutStrapiAxios = ({ path, body }: { path: string; body: object }) => {
  return useStrapiAxios({ method: "put", path, body });
};

const usePostStrapiAxios = ({ path, body }: { path: string; body: object }) => {
  return useStrapiAxios({ method: "post", path, body });
};

export default useStrapiAxios;
export {
  useGetStrapiAxios,
  useDeleteStrapiAxios,
  usePutStrapiAxios,
  usePostStrapiAxios,
};
