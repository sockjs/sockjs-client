var fs = require('fs');
var uglify = require('uglify-js');
var optparse = require('optparse');

var switches = [
    ['-p', '--pretty', 'Prettify javascript']
];

(function(){
     var gen_options = {};
     var parser = new optparse.OptionParser(switches);
     parser.on('pretty', function() {
                   gen_options.beautify = true;
               });
     var filenames = parser.parse(process.ARGV.slice(2));

     var content = [];
     for(var i = 0; i < filenames.length; i++) {
         var data = fs.readFileSync(filenames[i], encoding='utf8');
         content.push( data );
     }
     console.warn(" [.] Minifying:", filenames.join(', '));

     var data = content.join('\n');
     var ast = uglify.parser.parse(data);
     ast = uglify.uglify.ast_mangle(ast);
     ast = uglify.uglify.ast_squeeze(ast);
     var minified = uglify.uglify.gen_code(ast, gen_options);

     process.stdout.write(minified);
 })();
