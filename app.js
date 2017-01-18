const EDL = require('easy-dependency-loader');

EDL.setDependencies({
    "RequestHandler": "./handlers/RequestHandler.js"
});

const http = EDL.load('http')
const RequestHandler = EDL.load('RequestHandler');
const Promise = require('bluebird');

const port = process.env.PORT || 80
const host = '0.0.0.0'

const requestHandler = (request, response) => {
    return Promise
        .resolve(request)
        .then(RequestHandler.handle)
        .then(function (data) {
            response.removeHeader('Connection');
            response.removeHeader('Date');
            response.removeHeader('Transfer-Encoding');
            response.write(data.toString())
            return response.end();
        });  
}

const listenCb = (err) => {
    if (err) return console.log('something bad happened', err)
    console.log('server is listening on ' + port)
}

http
    .createServer(requestHandler)
    .listen(port, host, listenCb)