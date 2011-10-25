var fs = require('fs');
var spawn = require('child_process').spawn;

var title = "SockJS releases";
var url = 'https://github.com/sockjs/sockjs-client';

var p = console.log;

function git_mtime(file, cb) {
    var c = spawn('git', ['log','-1', '--pretty=format:%ai', file]);
    var d = [];
    c.stdout.on('data', function (data) {
        d.push( data.toString() );
    });
    c.on('exit', function () {
        cb(d.join(''));
    });
}


p('<!doctype html>');
p('<html><head><title>'+title+'</title></head><body lang="en"><h1>'+title+'</h1><ul>');
p('Source code: <a href="'+url+'"><b>'+url+'</b></a><hr><pre>');

var end;

fs.readdir(".", function(err, files) {
    files.sort();
    var run = function() {
        var file = files.shift();
        if (!file) {
            end();
            return;
        }
        if (/sockjs-latest[.]/.test(file)) {
            // ignore -latest
            run();
        } else if (/sock.*js/.test(file)) {
            var tab = Array(40 - file.length).join(' ');
            var stat = fs.statSync(file);
            git_mtime(file, function (mtime) {
                var http  = 'http://cdn.sockjs.org/'+file;
                var https = 'https://d1fxtkz8shb9d2.cloudfront.net/'+file;
                p('<a href="'+http+'">'+file+'</a>' + tab + mtime + '        ' + stat.size+
                  '    (<a href="'+http+'">http</a>|<a href="'+https+'">https</a>)');
                run();
            });
        } else {
            run();
        }
    };
    run();
});

end = function() {
    p('</pre></body></html>');
};
