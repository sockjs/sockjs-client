var fs = require('fs');

var title = "SockJS releases";
var url = 'https://github.com/majek/sockjs-client';

var p = console.log;

p('<html><head><title>'+title+'</title></head><body><h1>'+title+'</h1><ul>');
p('Source code: <a href="'+url+'"><b>'+url+'</b></a><br><br>');

var end;

fs.readdir(".", function(err, files) {
               files.sort();
               for(var i=0; i < files.length; i++) {
                   var file = files[i];
                   if (/sock.*js/.test(file)) {
                       p('<li><a href="'+file+'">'+file+'</a></li>');
                   }
               }
               end();
           });

end = function() {
    p('</ul></body></html>');
};
