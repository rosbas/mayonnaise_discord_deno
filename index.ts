import Client from "./src/client/Client.ts";
import { Constants } from "./src/constants/Constants.ts";
import { HiddenValue } from "./src/constants/Secret.ts";
import { add, pickedCard } from "./function.ts";

const client = new Client();

client.login(`${HiddenValue.TOKEN}`);

client.on("ready", () => {
  console.log("Bot has logged in.");
});

client.on("message", async (message: any) => {
  let msg = message.content.split(" ");
  if (msg[0] === "mayo") {
    switch (msg[1]) {
      case "sup":
        await createMessage("Wut sup peeps!", message.channel_id);
        break;
      default:
        await createMessage("Mayo desu~~", message.channel_id);
        break;
    }
  }
});

//   if (message.content === "sup") {
//     await createMessage("Wut sup peeps!", message.channel_id);
//   } else if (message.content === "roll") {
//     await createMessage(
//       Math.floor(Math.random() * 6),
//       message.channel_id,
//     );
//   } else if (message.content === "drawcard") {
//     await createMessage(
//       `Draw: ${pickedCard.card} of ${pickedCard.suit}`,
//       message.channel_id,
//     );
//   }
// });

async function createMessage(content: string | number, channelId: string) {
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
}
