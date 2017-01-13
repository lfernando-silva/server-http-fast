const EDL = require('easy-dependency-loader')
const Promise = EDL.load('bluebird')

module.exports = {
    handle: (request) => {
        //personalizar request
        return request;
    }
}
