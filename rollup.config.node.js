import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
import replace from 'rollup-plugin-replace';

import fs from 'fs';
var version = JSON.parse(fs.readFileSync('./package.json')).version;

export default {
	entry: 'lib/node-entry.js',
	dest: `build/sockjs-${version}.node.js`,
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
		replace({
			'ENV': 'process.env.NODE_ENV'
		}),
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
