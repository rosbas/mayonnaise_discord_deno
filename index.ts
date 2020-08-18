import Client from "./src/client/Client.ts";
import { Constants } from "./src/constants/Constants.ts";
import { HiddenValue } from "./src/constants/Secret.ts";

const client = new Client();

client.login(`${HiddenValue.TOKEN}`);

client.on("ready", () => {
  console.log("Bot has logged in.");
});

client.on("message", (message: any) => {
  console.log(message.content);
});

async function createMessage(content: string, channelId: string) {
  const data = {
    "content": content,
    "tts": false,
  };

  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bot ${client.token}`,
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
  console.log(json);
}
