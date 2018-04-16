var http = require('http');
http.createServer(function (request, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World!\n');
}).listen(process.env.PORT || 8080);
console.log('Server running');
