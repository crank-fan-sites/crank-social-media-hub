import type { NextPage } from "next";

import { useEffect, useState } from "react";

import Message from "@/components/front_page/discord-message";

import { Button } from "@/components/ui/button";
import {
  HeadingH1,
  HeadingH2,
  HeadingH3,
  Paragraph,
} from "@/components/typography";

const Discord: NextPage = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetch("/api/discordMessages")
      .then((response) => response.json())
      .then(setMessages);
  }, []);

  return (
    <div>
      {messages.map((message, index) => (
        <Message
          key={index}
          content={message.cleanContent}
          author={message.authorId}
          createdAt={message.createdTimestamp}
          embeds={message.embeds}
          attachments={message.attachments}
          reactions={message.stickers}
        />
      ))}
    </div>
  );
};

export default Discord;
