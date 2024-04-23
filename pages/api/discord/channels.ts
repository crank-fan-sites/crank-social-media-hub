import { Client, GatewayIntentBits } from "discord.js";
import strapiAxios from "@/lib/strapiAxios";

async function getStrapi(path) {
  try {
    const result = await strapiAxios().get(path);
    return result.data.data.attributes;
  } catch (error) {
    return { status: false };
  }
}

export default async function handler(req, res) {
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
      console.log(`Channel Name: ${channel.name} | Channel ID: ${channel.id}`);
    });
    res.status(200).json(arr);
    client.destroy();
  });

  client.login(process.env.NEXT_PUBLIC_DISCORD_BOT_TOKEN);
}
