import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import path from "path"

import { webSocketServer } from "./WebSocketServer"

export default defineConfig({
	plugins: [sveltekit(), webSocketServer],
	resolve: {
		alias: {
		  '@mqtt': path.resolve(__dirname, './node_modules/mqtt/bin/'),
		},
	  },
});
