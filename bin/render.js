var fs = require('fs');

function array_flatten(arr, acc) {
    if (typeof acc === 'undefined') {
        acc = [];
    }
    if(typeof arr === 'string') {
        acc.push(arr);
        return acc;
    } else if (arr.constructor !== Array) {
        throw "Value is not an Array nor a String!";
    }
    for(var i=0, l=arr.length; i < l; i++) {
        var v = arr[i];
        if(typeof v === 'string') {
            acc.push(v);
        } else if(v.constructor === Array) {
            array_flatten(v, acc);
        }else{
            throw "Value is not an Array nor a String!";
        }
    }
    return acc;
}

function render(filename, depth) {
    console.warn(depth + " [.] Rendering", filename);

    var data = fs.readFileSync(filename, encoding='utf8');
    data = data.replace(/\s+$/, ''); // trailing whitespace
    var content = [];
    content.push('// ' + depth + '[*] Including ' + filename);

    var elements = data.split(/<!--\s*include\s+(\S+)\s*-->/g);
    for(var i=0; i < elements.length; i++) {
        var e = elements[i];
        if(i % 2 === 0) {
            content.push(e);
        } else {
            content.push( render(e, depth + '    ') );
        }
    }
    content.push('// ' + depth + '[*] End of ' + filename);
    return content;
}

(function(){
     var content = [];
     for(var i = 2; i < process.argv.length; i++) {
         var filename = process.argv[i];
         content.push( render(filename, '') );
     }
     content.push('\n');
     process.stdout.write(array_flatten(content).join('\n'), 'utf8');
})();
