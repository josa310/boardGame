define(["require", "exports", "http", "websocket", "./player/Player", "./game/GameHandler", "./player/PlayerHandler"], function (require, exports, http, websocket_1, Player_1, GameHandler_1, PlayerHandler_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Server {
        constructor() {
            this._playerHandler = new PlayerHandler_1.PlayerHandler();
            this._gameHandler = new GameHandler_1.GameHandler(this._playerHandler);
            this.createHttpServer();
            this.createWebsocketServer();
        }
        createHttpServer() {
            this._server = http.createServer((request, response) => this.requestListener(request, response));
            this._server.listen(Server.WSSERVER_PORT, () => this.listeningListener());
        }
        requestListener(request, response) {
            // Not important for us. We're writing WebSocket server,
            // not HTTP server
        }
        listeningListener() {
            console.log((new Date()) + " Server is listening on port " + Server.WSSERVER_PORT);
        }
        createWebsocketServer() {
            this._wsServer = new websocket_1.server({ httpServer: this._server });
            this._wsServer.on("request", (request) => this.onWSRequest(request));
        }
        onWSRequest(request) {
            console.log((new Date()) + ' Connection from origin ' + request.origin + '.');
            var connection = request.accept(null, request.origin);
            let player = new Player_1.Player(connection);
            this._playerHandler.newConnect(player);
        }
        onMessage(e) {
            let message = e.message;
            if (message.type == "utf8") {
                console.log(message.utf8Data);
            }
            console.log(e.idx);
        }
        onPlayerLeave(e) {
            console.log(e.idx);
        }
    }
    Server.WSSERVER_PORT = 1337;
    exports.Server = Server;
});
//# sourceMappingURL=Server.js.map