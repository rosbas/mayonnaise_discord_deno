import { connectWebSocket } from 'https://deno.land/std/ws/mod.ts';
const GATEWAY = 'wss://gateway.discord.gg/?v=6&encoding=json';
try {
	const socket = await connectWebSocket(GATEWAY);
	console.log('Conneted');
	for await (const m of socket) {
		const payload = JSON.parse(m.toString());
		const { t, s, op, d } = payload;
		const { heartbeat_interval } = d;
		const p = { op: 1, d: null }; // fired to keep connection alive
		switch (op) {
			// case op 10 is returned immediately after connection.
			case 10:
				setInterval(() => {
					console.log(`Sending heartbeat every ${heartbeat_interval} milliseconds.`);
					socket.send(JSON.stringify(p));
				}, heartbeat_interval);
				const token = 'NzQyMjY4MDU2OTYwNDk5ODM0.XzDo_w.rqe87HqQqQhKttjpGhY2vmVU_gY';
				const properties = { $os: 'linux', $browser: 'deno-discord', $device: 'deno-discord' };
				const identify = {
					op: 2,
					d: { token, properties },
				};
				socket.send(JSON.stringify(identify));
				break;
		}
		console.log(payload);
	}
} catch (err) {
	console.log(err);
}
