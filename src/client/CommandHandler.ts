import { Command } from './../common/Command';
import { CommandEvent } from './event/CommandEvent';
import { Connection } from "./Connection";
import { Commands } from '../common/Command';
import { EventDispatcher } from '../common/event/EventDispatcher';
import { UICommandEvent } from "./event/UICommandEvent";

export class CommandHandler extends EventDispatcher
{
    protected _connection: Connection;
    protected _commandEvent: CommandEvent;

    constructor(address: string)
    {
        super();
        this._connection = new Connection(address);
        this._connection.addListener(CommandEvent.COMMAND, (e: CommandEvent) => this.onData(e));

        this.createEvents();
    }

    protected createEvents(): void
    {
        this._commandEvent = new CommandEvent();
    }

    protected onData(e: CommandEvent): void
    {
        this._commandEvent.type = e.command.next();
        this._commandEvent.command = e.command;
        this.dispatch(this._commandEvent);
    }

    public dispatchCommand(c: Command): void
    {
        this._connection.send(c.toString());
    }
}