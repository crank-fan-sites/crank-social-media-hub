import { useEffect, useState } from "react";
import type { NextPage } from "next";

import { HeadingH3 } from "@/components/typography";
import Image from "next/image";

import CTAButton from "@/components/ui2/variants/discord";

const Widget: NextPage = ({
  widget,
  imageSrc,
  alt,
  buttons,
}: {
  widget: string;
  imageSrc: string;
  alt: string;
  buttons: any[];
}) => {
  return (
    <>
      <HeadingH3 className="group-hover:font-bold">Discord Widget</HeadingH3>

      {buttons &&
        buttons.length > 0 &&
        buttons.map((button: any) => (
          <CTAButton key={button.id} {...button.link} />
        ))}

      <div className="patreon-container mt-10">
        <iframe
          src={widget}
          width="350"
          height="500"
          sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
        ></iframe>
      </div>

      <div className="items-center justify-center hidden p-0 lg:flex mt-20">
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
