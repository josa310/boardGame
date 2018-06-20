
export class Connection
{
    // public static readonly WS_ADDRESS: string = "ws://127.0.0.1:1337";

    protected _address: string;    
    protected _connection: WebSocket;
    protected _listeners: ((data: string) => void)[];

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
        this._listeners = new Array<(data: string) => void>();
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
        this.dispatch(message.data);
    }

    public send(data: string): void
    {
        this._connection.send(data);
    }

    public addListener(listener: (data: string) => void): void
    {
        this._listeners.push(listener);
    }

    protected dispatch(data: string): void
    {
        for (let listener of this._listeners)
        {
            listener(data);
        }
    }
}