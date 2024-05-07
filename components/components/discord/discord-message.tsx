import type { NextPage } from "next";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  HeadingH1,
  HeadingH2,
  HeadingH3,
  Paragraph,
} from "@/components/typography";

const DiscordMessage: NextPage = (props: any) => {
  const {
    content,
    createdAt,
    author,
    reactions,
    // embeds,
    // attachments
  } = props;
  const date = new Date(createdAt);
  const readableDate = `${date.toLocaleDateString()} at ${date.toLocaleTimeString()}`;
  return (
    <div className="pb-4 pr-2 pl-2 mt-1">
      <div className="flex justify-between items-center">
        <span className="text-sm font-light text-gray-600">{readableDate}</span>
      </div>
      <p className="mt-2 text-md break-words">{content}</p>
      <div className="border-b border-dashed border-gray-400 mt-3"></div>
    </div>
  );
};

export default DiscordMessage;
