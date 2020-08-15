import Client from "../client/Client.ts";
import { Payload } from "../interfaces/Payload.ts";

export default function (client: Client, payload: Payload) {
  console.log("Logged in");
  console.log(payload);
}
