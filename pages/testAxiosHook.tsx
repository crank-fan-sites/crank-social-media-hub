import { useState, useEffect } from "react";

import { NextPage } from "next";
import { MainLayout } from "@/layouts/layout";
import { HeadingH1 } from "@/components/typography";
import { links } from "@/lib/links";
import { Button } from "@/components/ui/button";

import useStrapiAxios, { usePutStrapiAxios } from "@/lib/axios";

const Abouts: NextPage = () => {
  const { response, loading, error } = useStrapiAxios({
    method: "put",
    path: "/social-media-instagrams/4",
    body: {
      api_client_id: "11",
      api_redirect_uri: "https://axiomos.appy",
    },
  });

  // OR

  // const { response, loading, error } = usePutStrapiAxios({
  //   path: "/social-media-instagrams/4",
  //   body: {
  //     api_client_id: "23",
  //     api_redirect_uri: "https://axiomos.app",
  //   },
  // });
  const [data, setData] = useState([]);

  useEffect(() => {
    if (response !== null) {
      setData(response.data);
      console.log("res", response);
    }
  }, []);

  return (
    <MainLayout>
      <div className="container px-4">
        <HeadingH1 className="my-8">Privacy Policy</HeadingH1>
        <p>To be honest. I&apos;m not collecting anything besides ZOOTed</p>
      </div>
    </MainLayout>
  );
};

export default Abouts;
