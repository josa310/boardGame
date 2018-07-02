import { Command, Commands } from './../../common/Command';
import { InteractionWindow } from "./window/InteractionWindow";
import { CommandHandler } from "../CommandHandler";
import { UICommandEvent } from "../event/UICommandEvent";
import { GameSelectWindow } from './window/GameSelectWindow';
import { CommandEvent } from '../event/CommandEvent';

export class UIHandler
{
    protected _root: HTMLElement;
    protected _commandHandler: CommandHandler;
    protected _gameSelectWindow: GameSelectWindow;

    constructor(commandHandler: CommandHandler)
    {
        this._root = document.body;
        this._commandHandler = commandHandler;
        
        this._gameSelectWindow = new GameSelectWindow(this._root);
        this._gameSelectWindow.addListener(CommandEvent.COMMAND, (e: CommandEvent) => this.onResponse(e));

        this._commandHandler.addListener(UICommandEvent.UI_COMMAND, (e: UICommandEvent) => this.onCommand(e));
    }

    protected onCommand(e: UICommandEvent): void
    {
        let command: Command = e.command;

        switch (command.next())
        {
            case Commands.GAME_LIST.toString():
                this._gameSelectWindow.show(command);
            break;

            default:
            break;
        }
    }

    protected onResponse(e: CommandEvent): void
    {
        this._commandHandler.dispatchCommand(e.command);
    }
}