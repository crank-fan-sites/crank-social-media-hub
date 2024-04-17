import { useState, useEffect, useRef } from "react";
import axios from "axios";
import isEqual from "lodash.isequal"; // lodash's isEqual for deep comparison

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

  const bodyRef = useRef(body);

  // Check if body has changed using deep comparison
  const hasBodyChanged = !isEqual(bodyRef.current, body);
  if (hasBodyChanged) {
    bodyRef.current = body;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
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

        const result = await axios(req);
        setResponse(result.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    if (hasBodyChanged || method !== "get") {
      // For non-GET requests, always attempt to fetch
      fetchData();
    }
  }, [method, path, hasBodyChanged]); // Depend on hasBodyChanged to trigger effect

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
