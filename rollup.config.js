import resolve from 'rollup-plugin-node-resolve';
import globals from 'rollup-plugin-node-globals';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import json from 'rollup-plugin-json';
import uglify from 'rollup-plugin-uglify';

import fs from 'fs';
var version = JSON.parse(fs.readFileSync('./package.json')).version;
var debugRegexp = new RegExp('^debug', 'i');
var isProduction = process.env.NODE_ENV === 'production';
var filename = isProduction ? `sockjs-${version}.min.js` : `sockjs-${version}.js`;
console.log('building to', filename);

export default {
	entry: 'lib/browser-entry.js',
	dest: `build/${filename}`,
	format: 'umd',
	moduleName: 'SockJS',
	sourceMap: true,
	legacy: true,
	banner: `/* sockjs-client v${version} | http://sockjs.org | MIT license */\n`,
	plugins: [
		// replace({
		// 	'ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
		// 	include: 'lib/utils/debug.js'
		// }),
		resolve({
			main: true,
			browser: true,
			preferBuiltins: false,
		}),
		commonjs(),
		globals(),
		json(),
		// (isProduction && uglify({
    //   compress: {
    //     // remove debug statements from output entirely
    //     // pure_funcs: function(expr) {
		// 		// 	return expr.expression.print_to_string().search(debugRegexp) < 0;
		// 		// }
		// 		dead_code: false,
		// 		conditionals: false,
		// 		unused: false
    //   },
		// 	output: {
		// 		beautify: true
		// 	},
		// 	mangle: false
    // }))
	]
};
