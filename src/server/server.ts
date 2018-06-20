import { server as WSServer, request, connection, IMessage} from "websocket";
import * as http from "http";

export class Server
{
    public static readonly WSSERVER_PORT: number = 1337;

    protected _server: http.Server;
    protected _wsServer: WSServer;

    constructor()
    {
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
        connection.sendUTF("roleWindow,What role will you play?,Player,Master,Observer");
        var asd = Math.random();
        connection.on('message', (message: IMessage) => this.onWSMessage(message, asd)); 
    }

    protected onWSMessage(message: IMessage, idx: number): void
    {
        if (message.type)
        {
            console.log(message.utf8Data);
        }
        console.log(idx);
    }
}

var asd = new Server();