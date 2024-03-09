import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	resolve: {
		alias: {
			'events': 'eventemitter3',
		},
	},
	server: {
		host: '0.0.0.0',
		port: 3000,
	},
});
