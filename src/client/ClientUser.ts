export default class ClientUser {
  constructor(
    private username: string,
    private discriminator: number,
    private mfa_enabled: boolean,
    private verified: boolean,
    private id: string,
    private flags: number,
    private email: string,
    private bot: boolean,
    private avatar: string,
  ) {
  }
}
