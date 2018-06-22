var requirejs = require('requirejs');

var serverModule = requirejs('./dist/server/server');

let server = new serverModule.Server();