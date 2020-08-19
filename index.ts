import Client from "./src/client/Client.ts";
import { Constants } from "./src/constants/Constants.ts";
import { HiddenValue } from "./src/constants/Secret.ts";

const client = new Client();

client.login(`${HiddenValue.TOKEN}`);

client.on("ready", () => {
  console.log("Bot has logged in.");
});

client.on("message", async (message: any) => {
  console.log(message.content);
  if (message.content === "sup") {
    await createMessage("Wut sup peeps!", message.channel_id);
  }
});

async function createMessage(content: string, channelId: string) {
  const data = {
    "content": content,
    "tts": false,
  };

  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bot ${HiddenValue.TOKEN}`,
  };

  const response = await fetch(
    `${Constants.API}/channels/${channelId}/messages`,
    {
      method: "POST",
      headers,
      body: JSON.stringify(data),
    },
  );
  const json = await response.json();
  // console.log(json);
}
