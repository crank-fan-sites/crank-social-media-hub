import type { NextPage } from "next";

import TwitchHighlights from "@/components/components/twitch/twitch-highlights";

import CTAButton from "@/components/ui2/variants/twitch";

import Image from "next/image";
import {
  HeadingH1,
  HeadingH2,
  HeadingH3,
  Paragraph,
} from "@/components/typography";

const RowTwitchAndImage: NextPage = ({
  highlighted,
  width,
  height,
  buttons,
}) => {
  return (
    <div className="grid grid-cols-1 border-t bg-primary lg:grid-cols-2 border-stone-400 dark:border-stone-600">
      <div className="px-2 py-6 border-b group md:p-2 lg:p-4 border-stone-400 dark:border-stone-600 md:border-b-0 hover:bg-scanlines">
        <div className="px-1 py-4 pl-2 ml-20 md:p-4 lg:p-4 lg:pl-0">
          <HeadingH2 className="text-base group-hover:font-bold">
            Highlighted Twitch Clips
          </HeadingH2>
          {buttons &&
            buttons.length > 0 &&
            buttons.map((button: any) => (
              <CTAButton key={button.id} {...button.link} />
            ))}
          <TwitchHighlights
            highlighted={highlighted}
            width={width}
            height={height}
          />
        </div>
      </div>
      <div className="items-center justify-center hidden p-0 lg:flex">
        <Image
          src="/screenshots-vertical/Twitch-unelectable-text-600x720_vertical.png"
          width={600}
          height={720}
          alt="UnelectableAirwaves Alien"
        />
      </div>
    </div>
  );
};

export default RowTwitchAndImage;
