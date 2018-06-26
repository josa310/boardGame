import { BaseEvent } from "../../common/EventDispatcher";
import { Command } from "../../common/Command";

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