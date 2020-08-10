import { connectWebSocket, WebSocket } from 'https://deno.land/std/ws/mod.ts';
import { Constants, OPCODE } from '../constants/Constants.ts';
import { Heartbeat, Identify } from '../constants/Payload.ts';

export default class WebSocketManager {
	private socket: any;
	private interval: any;

	async connect(token: string) {
		try {
			this.socket = await connectWebSocket(Constants.GATEWAY);
			for await (const msg of this.socket) {
				const payload = JSON.parse(msg.toString());
				console.log(payload);
				switch (payload.op) {
					case OPCODE.DISPATCH:
						console.log('An event was triggered.');
						break;
					case OPCODE.HELLO:
						const { t: event, s, op, d } = payload;
						const { heartbeat_interval } = d;
						this.interval = this.heartbeat(heartbeat_interval);
						await this.identify(token);
						break;
					case OPCODE.HEARTBEAT_ACK:
						break;
				}
			}
		} catch (err) {
			console.log(err);
			return err;
		}
	}
	heartbeat(ms: number) {
		return setInterval(() => {
			this.socket.send(JSON.stringify(Heartbeat));
		}, ms);
	}
	async identify(token: string) {
		Identify.d.token = token;
		return this.socket.send(JSON.stringify(Identify));
	}
}
