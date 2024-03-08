import { Client, GatewayIntentBits } from "discord.js";

export default async function handler(req, res) {
  const client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
    ],
  });

  client.once("ready", async () => {
    const channel = await client.channels.fetch("855475575217061904");
    const messages = await channel.messages.fetch({ limit: 25 });
    res.status(200).json(messages);
    // res.status(200).json(messages.map((message) => message));
    client.destroy();
  });

  client.login(
    "MTIxNTM4OTkzNDEyNzY4MTY1OA.GLIKh8.ZNJA-m7veh6A_SgHcA3PUXYc_HvuVGzfigcTTo"
  );
}
