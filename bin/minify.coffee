#!/usr/bin/env coffee

fs = require('fs')
uglify = require('uglify-js')
optparse = require('optparse')

switches = [
    ['-p', '--pretty', 'Prettify javascript']
]

minify_options = {toplevel: true}
parser = new optparse.OptionParser(switches)
parser.on 'pretty', ->
                   minify_options.beautify = true

filenames = parser.parse(process.ARGV.slice(2))

content = for filename in filenames
            fs.readFileSync(filename, encoding='utf8')

console.warn(" [.] Minifying:", filenames.join(', '))

minify = (data, minify_options)->
    ast = uglify.parser.parse(data)
    ast = uglify.uglify.ast_mangle(ast, minify_options)
    ast = uglify.uglify.ast_squeeze(ast)
    uglify.uglify.gen_code(ast, minify_options)

process.stdout.write(minify(content.join('\n'), minify_options))
