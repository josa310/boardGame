import { Command } from "../../common/Command";
import { BaseEvent } from "../../common/event/BaseEvent";

export class CommandEvent extends BaseEvent
{
    public static readonly COMMAND: string = "COMMAND";

    protected _command: Command;

    public get command(): Command
    {
        return this._command;
    }

    public set command(value: Command)
    {
        this._command = value;
    }

    constructor(type: string = CommandEvent.COMMAND)
    {
        super(type);
    }
}