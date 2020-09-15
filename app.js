const http = require('http');
const routes = require('./route');
console.log(routes.def);
//function rRlestener(req, res) {}

const server = http.createServer(routes.abc);

server.listen(2100);