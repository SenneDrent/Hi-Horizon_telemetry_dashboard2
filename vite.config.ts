import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import path from "path"

import { Server } from 'socket.io';
// import { fetchLatestData } from 'src/lib/server/db/queries';
import { json } from '@sveltejs/kit';
import Database from 'better-sqlite3';

export const db = new Database('HiHorizonTelemetry.db', { fileMustExist: true });

export function fetchLatestData() {
    const stmt = db.prepare("SELECT * FROM Data where UnixTime = (SELECT max(UnixTime) FROM Data)");
    const result = stmt.get();

    return result;
}

export const webSocketServer = {
	name:'webSocketServer',
	configureServer(server:any) {
		const io = new Server(server.httpServer);

		setInterval(()=>{
			let update = fetchLatestData();
			io.emit("dataUpdate", update)
		},1000);

		io.on('connection', (socket) => {
			console.log("connected");
			socket.on('dataUpdate', (msg) => {
			  console.log('message: ' + msg);
			});
		});
	}
}

export default defineConfig({
	plugins: [sveltekit(), webSocketServer],
	resolve: {
		alias: {
		  '@mqtt': path.resolve(__dirname, './node_modules/mqtt/bin/'),
		},
	  },
});
