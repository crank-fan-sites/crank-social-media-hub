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
    // author,
    // reactions,
    // embeds,
    // attachments
  } = props;
  const date = new Date(createdAt);
  const readableDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  return (
    <div className="p-2 discord-message">
      <p>{content}</p>
      <p>on {readableDate}</p>
      <p>{/* <Link href={url}>Jump to this in Discord</Link> */}</p>
    </div>
  );
};

export default DiscordMessage;
