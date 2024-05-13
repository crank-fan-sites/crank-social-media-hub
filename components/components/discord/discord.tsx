import type { NextPage } from "next";

import { useEffect, useState } from "react";

import Message from "@/components/components/discord/discord-message";
import CTAButton from "@/components/ui2/variants/discord";

interface DiscordProps {
  messages?: any[];
  buttons?: { id: string; link: any }[];
}

const Discord: NextPage<DiscordProps> = ({
  messages: initialMessages,
  buttons,
}) => {
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    if (!initialMessages) {
      fetch("/api/discord/messages")
        .then((response) => response.json())
        .then(setMessages)
        .catch((error) => console.error("Failed to load messages", error));
    } else {
      setMessages(initialMessages);
    }
  }, [initialMessages]);

  return (
    <div>
      {buttons &&
        buttons.length > 0 &&
        buttons.map((button: any) => (
          <CTAButton key={button.id} {...button.link} />
        ))}
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
