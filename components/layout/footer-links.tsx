import { NextPage } from "next";
import { useEffect, useState } from "react";
import { HeadingH1 } from "@/components/typography";
import Alink from "@/components/layout/footer-link";
import { Button } from "@/components/ui/button";

const Links: NextPage = ({ links }: { links: any[] }) => {
  return (
    <div className="">
      {links &&
        links.length > 0 &&
        links.map((link) => {
          return <Alink key={link.id} title={link.title} url={link.url} />;
        })}
    </div>
  );
};

export default Links;
