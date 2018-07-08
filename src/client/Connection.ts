import { Command } from './../common/Command';
import { EventDispatcher } from "../common/event/EventDispatcher";
import { CommandEvent } from "./event/CommandEvent";

export class Connection extends EventDispatcher
{
    protected _address: string;    
    protected _command: Command;
    protected _connection: WebSocket;
    protected _commandEvent: CommandEvent;

    constructor(address: string)
    {
        super();
        this._address = address;
        this._command = new Command();
        this._commandEvent = new CommandEvent();
        this._commandEvent.command = this._command;

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

    protected onMessage(event: MessageEvent): void
    {
        this._command.processData(event.data);
        this.dispatch(this._commandEvent);
    }

    public send(data: string): void
    {
        this._connection.send(data);
    }
}