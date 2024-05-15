import { useEffect, useState } from "react";
import type { NextPage } from "next";

import { HeadingH3 } from "@/components/typography";

import SoundCloudPlayer from "@/components/components/soundcloud/soundcloud-player";

import CTAButton from "@/components/ui2/variants/soundcloud";

const Soundcloud: NextPage = ({ tracks = [] }) => {
  return (
    <div className="px-2 py-6 group md:p-8 lg:p-12 hover:bg-scanlines">
      <HeadingH3 className="group-hover:font-bold">Featured Songs</HeadingH3>
      {tracks &&
        tracks.length > 0 &&
        tracks.map((item) => (
          <div key={item.id}>
            {item.buttonLink &&
              item.buttonLink.length > 0 &&
              item.buttonLink.map((button: any) => (
                <CTAButton key={button.id} {...button.link} />
              ))}
            <div className="mb-10" key={item.id}>
              <SoundCloudPlayer trackUrl={item.media_url} />
            </div>
          </div>
        ))}
    </div>
  );
};

export default Soundcloud;
