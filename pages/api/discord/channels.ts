import type { NextApiRequest, NextApiResponse } from "next";
import { Client, GatewayIntentBits } from "discord.js";
import { getStrapi } from "@/lib/getStrapi";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { guild_id } = await getStrapi("/social-media-discord");
  const client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
    ],
  });

  client.once("ready", async () => {
    const guild = client.guilds.cache.get(guild_id);

    if (!guild) {
      console.log("Guild not found!");
      return;
    }

    const arr = [];
    // Loop through all channels in the guild
    guild.channels.cache.forEach((channel) => {
      // Print the channel name and ID
      arr.push({ name: channel.name, id: channel.id });
    });
    res.status(200).json(arr);
    client.destroy();
  });

  client.login(process.env.NEXT_PUBLIC_DISCORD_BOT_TOKEN);
}
