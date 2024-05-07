import { useEffect, useState } from "react";
import type { NextPage } from "next";

import { HeadingH3 } from "@/components/typography";
import Image from "next/image";

import CTAButton from "@/components/ui2/variants/discord";

const Widget: NextPage = ({
  widget,
  imageSrc,
  alt,
}: {
  widget: string;
  imageSrc: string;
  alt: string;
}) => {
  return (
    <>
      <HeadingH3 className="text-base group-hover:font-bold">
        Discord Widget
      </HeadingH3>

      <CTAButton url="https://discord.gg" />

      <div className="patreon-container">
        <iframe
          src={widget}
          width="350"
          height="500"
          sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
        ></iframe>
      </div>

      <div className="items-center justify-center hidden p-0 lg:flex">
        <Image
          src={imageSrc}
          width={350}
          height={720}
          className="w-full"
          alt={alt}
        />
      </div>
    </>
  );
};

export default Widget;
