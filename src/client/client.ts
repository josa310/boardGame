
class Client
{
    // public static readonly WS_ADDRESS: string = "ws://127.0.0.1:1337";

    protected _address: string;    
    protected _connection: WebSocket;

    constructor(address: string)
    {
        this._address = address;

        this.establishConnection();
    }

    protected establishConnection(): void
    {
        this._connection = new WebSocket(this._address);

        this._connection.onopen = () => this.onOpen();
        this._connection.onerror = (e: Event) => this.onError(e);
        this._connection.onmessage = (e: MessageEvent) => this.onMessage(e);
    }
    
    protected onOpen(): void
    {
        console.log("Connection established.");
    }
    
    protected onError(e: Event): void
    {
        console.log("Some error happened.", e);
    }

    protected onMessage(message: MessageEvent): void
    {
        console.log(message.data);
    }

    // function myFunction()
    // {
    //     connection.send("Message");
    //     console.log("Message sent!");
    // }
}