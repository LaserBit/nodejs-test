var http = require('http');
var msg;

http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    
    switch (req.url) {
        case '/about':
            msg = "Welcome to LaserBit's website."
            break;
        default:
            msg = "Hello World!!"
            break;
    }
    res.write(msg);
    res.end();
}).listen(process.env.PORT || 8080);
console.log('Server running');
