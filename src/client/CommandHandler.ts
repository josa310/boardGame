import { Command } from './../common/Command';
import { CommandEvent } from './event/CommandEvent';
import { Connection } from "./Connection";
import { Commands } from '../common/Command';
import { EventDispatcher } from './../common/EventDispatcher';
import { UICommandEvent } from "./event/UICommandEvent";

export class CommandHandler extends EventDispatcher
{
    protected _connection: Connection;
    protected _uiCommandEvent: UICommandEvent;

    constructor(address: string)
    {
        super();
        this._connection = new Connection(address);
        this._connection.addListener(CommandEvent.COMMAND, (e: CommandEvent) => this.onData(e));

        this.createEvents();
    }

    protected createEvents(): void
    {
        this._uiCommandEvent = new UICommandEvent();
    }

    protected onData(e: CommandEvent): void
    {
        let command: Command = e.command;
        switch (command.next())
        {
            case Commands.UI_MESSAGE: 
                this._uiCommandEvent.command = command;
                this.dispatch(this._uiCommandEvent);
                break;

            case "teamWindow":
                break;
            
            default:
                break;
        }
    }
}