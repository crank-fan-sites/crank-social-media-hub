import { useState, useEffect } from "react";

import { NextPage } from "next";
import { MainLayout } from "@/layouts/layout";
import { HeadingH1 } from "@/components/typography";
import { links } from "@/lib/links";
import { Button } from "@/components/ui/button";

import { usePutStrapiAxios } from "@/lib/strapiAxios";

const testAxiosMemo: NextPage = () => {
  const body = {
    api_client_id: "4",
    api_redirect_uri: "https://axiomos.appiyBODY",
  };
  const { response, loading, error } = usePutStrapiAxios({
    path: "/social-media-instagrams/4",
    body,
  });
  const [data, setData] = useState([]);

  useEffect(() => {
    if (response != null) {
      setData(response.data);
      console.log("res", response);
    }
  }, [response]);

  return (
    <MainLayout>
      <div className="container px-4">
        <HeadingH1 className="my-8">Privacy Policy</HeadingH1>
        <p>To be honest. I&apos;m not collecting anything besides ZOOTed</p>
      </div>
    </MainLayout>
  );
};

export default testAxiosMemo;
