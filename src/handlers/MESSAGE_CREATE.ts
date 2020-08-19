import Client from "../client/Client.ts";
import { Payload } from "../interfaces/Payload.ts";

export default function (client: Client, payload: Payload) {
  let username = payload.d.author.username;
  if (username !== "Mayonnaise") {
    client.emit("message", payload.d);
  }
}
