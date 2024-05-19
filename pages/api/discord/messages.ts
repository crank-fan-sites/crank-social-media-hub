import type { NextApiRequest, NextApiResponse } from "next";

import { Client, GatewayIntentBits } from "discord.js";
import { getStrapi } from "@/lib/getStrapi";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let channelId = req.query.channelId as string | undefined;
  if (!channelId) {
    try {
      const data = await getStrapi("/front-page?populate=discord");
      const { channel_id } = data.discord;
      channelId = channel_id;
    } catch (error) {
      console.error("Failed to retrieve channel ID from Strapi:", error);
      return res.status(500).json({ error: "Failed to retrieve channel ID" });
    }
  }

  const client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
    ],
  });

  try {
    await client.login(process.env.NEXT_PUBLIC_DISCORD_BOT_TOKEN);
    client.once("ready", async () => {
      try {
        const channel = await client.channels.fetch(channelId);
        const messages = await channel.messages.fetch({ limit: 25 });
        res.status(200).json(messages);
      } catch (fetchError) {
        console.error("Failed to fetch messages:", fetchError);
        res.status(500).json({ error: "Failed to fetch messages" });
      } finally {
        client.destroy();
      }
    });
  } catch (loginError) {
    console.error("Discord client login failed:", loginError);
    res.status(500).json({ error: "Discord client login failed" });
  }
}
