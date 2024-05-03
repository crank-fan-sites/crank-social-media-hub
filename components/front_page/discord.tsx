import type { NextPage } from "next";

import { useEffect, useState } from "react";

import Message from "@/components/front_page/discord-message";
import CTAButton from "@/components/ui2/variants/discord";

const Discord: NextPage = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetch("/api/discord/messages")
      .then((response) => response.json())
      .then(setMessages);
  }, []);

  return (
    <div>
      <CTAButton url="https://discord.gg" />
      {messages.map(
        (message, index) =>
          message.cleanContent && (
            <Message
              key={index}
              content={message.cleanContent}
              author={message.authorId}
              createdAt={message.createdTimestamp}
              embeds={message.embeds}
              attachments={message.attachments}
              reactions={message.stickers}
            />
          )
      )}
    </div>
  );
};

export default Discord;
