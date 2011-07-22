var fs = require('fs');
var uglify = require('uglify-js');

(function(){
     var content = [];
     var filenames = [];
     for(var i = 2; i < process.argv.length; i++) {
         var filename = process.argv[i];
         filenames.push(filename);
         var data = fs.readFileSync(filename, encoding='utf8');
         content.push( data );
     }
     console.warn(" [.] Minifying:", filenames.join(', '));

     var data = content.join('\n');
     var ast = uglify.parser.parse(data);
     ast = uglify.uglify.ast_mangle(ast);
     ast = uglify.uglify.ast_squeeze(ast);
     var minified = uglify.uglify.gen_code(ast);

     process.stdout.write(minified);
 })();
