import Client from "../client/Client.ts";
import { Payload } from "../interfaces/Payload.ts";
import ClientUser from "../client/ClientUser.ts";

export default function (client: Client, payload: Payload) {
  console.log("Logged in");
  const { user } = payload.d;
  client.user = new ClientUser(
    user.username,
    user.discriminator,
    user.verified,
    user.mfa_enabled,
    user.id,
    user.flags,
    user.email,
    user.bot,
    user.avatar,
  );
  console.log(client);
}
