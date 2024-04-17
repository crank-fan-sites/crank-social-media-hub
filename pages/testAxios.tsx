import { useState, useEffect } from "react";
import axios from "axios";

import { NextPage } from "next";
import { MainLayout } from "@/layouts/layout";
import { HeadingH1 } from "@/components/typography";
import { links } from "@/lib/links";
import { Button } from "@/components/ui/button";

// import useStrapiAxios from "@/lib/axios";

const Label: NextPage = () => {
  const [test, setTest] = useState(null);

  // axios.defaults.baseURL = process.env.NEXT_PUBLIC_STRAPI_API_URL;
  const strapiToken = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${strapiToken}`,
  };
  const method = "put";
  const path = "/social-media-instagrams/4";
  const body = {
    api_client_id: "353562654",
    api_redirect_uri: "https://axios.app",
  };
  const data = { data: body };

  const req = {
    method: method,
    baseURL: process.env.NEXT_PUBLIC_STRAPI_API_URL,
    url: path,
    headers: headers,
    data: data,
  };

  const req2 = {
    method: method,
    baseURL: process.env.NEXT_PUBLIC_STRAPI_API_URL,
    url: path,
    headers: headers,
    data: data,
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await axios(req);
      console.log("data2", data);
    };

    fetchData();
  }, []);
  // .then((res) => {
  //   setTest(res.data);
  //   console.log("data", res.data);
  //   // setResponse(res.data);
  // })
  // .catch((err) => {
  //   console.log("error", err);
  //   // setError(err);
  // })
  // .finally(() => {
  //   console.log("finally");
  //   // setLoading(false);
  // });
  // const fetchData = () => {
  //   axios[method](path, headers, body)
  //     .then((res) => {
  //       setTest(res.data);
  //       // setResponse(res.data);
  //     })
  //     .catch((err) => {
  //       console.log('error', err);
  //       // setError(err);
  //     })
  //     .finally(() => {
  //       console.log('finally');
  //       // setLoading(false);
  //     });
  // };
  return (
    <MainLayout>
      {/* TODO: add head */}
      {/* TODO: refactor Links into Dynamic Zones */}
      <div className="container px-4">
        <HeadingH1 className="my-8">Privacy Policy</HeadingH1>
        <p>To be honest. I&apos;m not collecting anything besides ZOOTed</p>
      </div>
    </MainLayout>
  );
};

export default Label;
