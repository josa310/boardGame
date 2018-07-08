import { Command } from './../../common/Command';
import { BaseEvent } from '../../common/event/BaseEvent';

export class UICommandEvent extends BaseEvent
{
    public static readonly UI_COMMAND: string = "UI_COMMAND";

    protected _command: Command;

    public get command(): Command
    {
        return this._command;
    }

    public set command(value: Command)
    {
        this._command = value;
    }

    constructor(type: string = UICommandEvent.UI_COMMAND)
    {
        super(type);
    }
}