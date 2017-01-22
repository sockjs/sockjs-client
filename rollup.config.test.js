import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';

export default {
	entry: 'tests/node.js',
	dest: 'build/sockjs.test.js',
	format: 'cjs',
	interop: false,
	sourceMap: false,
	external: [
		'events',
		'util',
		'http',
		'https',
		'url',
		'stream',
		'tls',
		'net',
		'crypto',
		'fs',
		'tty',
		'json3'
	],
	plugins: [
		resolve({
			main: true,
			browser: false,
			preferBuiltins: true,
			skip: [
				'json3'
			]
		}),
		commonjs({
			namedExports: {
				'faye-websocket': ['WebSocket', 'Client', 'EventSource']
			}
		}),
		json(),
	]
};
