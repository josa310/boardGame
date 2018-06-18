"use strict";
exports.__esModule = true;
var websocket_1 = require("websocket");
var http = require("http");
var Server = /** @class */ (function () {
    function Server() {
        this.createHttpServer();
        this.createWebsocketServer();
    }
    Server.prototype.createHttpServer = function () {
        var _this = this;
        this._server = http.createServer(function (request, response) { return _this.requestListener(request, response); });
        this._server.listen(Server.WSSERVER_PORT, function () { return _this.listeningListener(); });
    };
    Server.prototype.requestListener = function (request, response) {
        // Not important for us. We're writing WebSocket server,
        // not HTTP server
    };
    Server.prototype.listeningListener = function () {
        console.log((new Date()) + " Server is listening on port " + Server.WSSERVER_PORT);
    };
    Server.prototype.createWebsocketServer = function () {
        var _this = this;
        this._wsServer = new websocket_1.server({ httpServer: this._server });
        this._wsServer.on("request", function (request) { return _this.onWSRequest(request); });
    };
    Server.prototype.onWSRequest = function (request) {
        var _this = this;
        console.log((new Date()) + ' Connection from origin ' + request.origin + '.');
        var connection = request.accept(null, request.origin);
        connection.sendUTF("Message Sent.");
        var asd = Math.random();
        connection.on('message', function (message) { return _this.onWSMessage(message, asd); });
    };
    Server.prototype.onWSMessage = function (message, idx) {
        if (message.type) {
            console.log(message.utf8Data);
        }
        console.log(idx);
    };
    Server.WSSERVER_PORT = 1337;
    return Server;
}());
exports.Server = Server;
var asd = new Server();
//# sourceMappingURL=server.js.map