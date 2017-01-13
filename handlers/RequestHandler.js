const EDL = require('easy-dependency-loader')
const Promise = EDL.load('bluebird')
const path = EDL.load('path')
const fs = Promise.promisifyAll(EDL.load('fs'))

const filesPath = './files'

module.exports = {
    handle: (request) => {
        return Promise
            .resolve(path.join(filesPath, request.url))
            .then(fs.readFileAsync)
            .catch(function (err) {
                return 'ERRO PORQUE NÃO EXISTE O ARQUIVO';
            });
    }
}