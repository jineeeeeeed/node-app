var http = require('http');
var options ={
        host : 'localhost',
        port : 1337,
        path : '/',
        method : 'POST'
};

var req = http.request(options, function(res) {
    var data = '';
    res.on('data', function(chunk) {
        data += chunk;
    });

    res.on('end', function() {
        console.log('data is ' + data);
    });
});

var msg = 'Hello from HTTP Client Request';

req.setHeader('Content-Length', Buffer.byteLength(msg));
req.write(msg);
req.end();