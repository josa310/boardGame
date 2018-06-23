import { PlayerEvent } from './event/PlayerEvent';
import { Player } from './Player';
import { server as WSServer, request, connection, IMessage} from "websocket";
import * as http from "http";

export class Server
{
    public static readonly WSSERVER_PORT: number = 1337;

    protected _server: http.Server;
    protected _wsServer: WSServer;
    protected _players: {[key: number]: Player};

    constructor()
    {
        this._players = {};
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
        this._players[player.idx] = player;

        player.addListener(PlayerEvent.MESSAGE, (e: PlayerEvent) => this.onMessage(e));
        player.addListener(PlayerEvent.DISCONNECT, (e: PlayerEvent) => this.onPlayerLeave(e));

        player.send("roleWindow,What role will you play?,Player,Master,Observer");
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