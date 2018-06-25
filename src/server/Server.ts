import * as http from "http";
import { server as WSServer, request, connection, IMessage} from "websocket";

import { Game } from './game/Game';
import { Player } from './player/Player';
import { Command, CommandCreator } from './../common/Command';
import { PlayerEvent } from './event/PlayerEvent';
import { GameHandler } from "./game/GameHandler";
import { PlayerHandler } from "./player/PlayerHandler";

export class Server
{
    public static readonly WSSERVER_PORT: number = 1337;

    protected _wsServer: WSServer;
    protected _server: http.Server;
    protected _gameHandler: GameHandler;
    protected _playerHandler: PlayerHandler;

    constructor()
    {
        this._playerHandler = new PlayerHandler();
        this._gameHandler = new GameHandler(this._playerHandler);
        this.createHttpServer();
        this.createWebsocketServer();   
    }

    protected createHttpServer(): void
    {
        this._server = http.createServer((request: http.IncomingMessage, response: http.ServerResponse) => this.requestListener(request, response));
        this._server.listen(Server.WSSERVER_PORT, () => this.listeningListener());
    }

    protected requestListener(request: http.IncomingMessage, response: http.ServerResponse): void
    {
        // Not important for us. We're writing WebSocket server,
        // not HTTP server
    }

    protected listeningListener(): void
    {
        console.log((new Date()) + " Server is listening on port " + Server.WSSERVER_PORT);
    }

    protected createWebsocketServer(): void
    {
        this._wsServer = new WSServer({httpServer: this._server});
        this._wsServer.on("request", (request: request) => this.onWSRequest(request));
    }

    protected onWSRequest(request: request): void
    {
        console.log((new Date()) + ' Connection from origin ' + request.origin + '.');
        var connection: connection = request.accept(null, request.origin); 
        let player = new Player(connection);

        this._playerHandler.playerConnect(player);
    }

    protected onMessage(e: PlayerEvent): void
    {
        let message: IMessage = e.message;
        if (message.type == "utf8")
        {
            console.log(message.utf8Data);
        }
        console.log(e.idx);
    }

    protected onPlayerLeave(e: PlayerEvent): void
    {
        console.log(e.idx);
    }
}