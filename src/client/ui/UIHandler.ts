import { Command, Commands } from './../../common/Command';
import { InteractionWindow } from "./window/InteractionWindow";
import { CommandHandler } from "../CommandHandler";
import { UICommandEvent } from "../event/UICommandEvent";

export class UIHandler
{
    protected _root: HTMLElement;
    protected _commandHandler: CommandHandler;
    protected _interactionWindow: InteractionWindow;

    constructor(commandHandler: CommandHandler)
    {
        this._root = document.body;
        this._commandHandler = commandHandler;
        
        this._interactionWindow = new InteractionWindow(this._root);

        this._commandHandler.addListener(UICommandEvent.UI_COMMAND, (e: UICommandEvent) => this.onCommand(e));
    }

    protected onCommand(e: UICommandEvent): void
    {
        let command: Command = e.command;

        switch (command.next())
        {
            case Commands.GAME_LIST:
                this._interactionWindow.show(command);
            break;

            default:
            break;
        }
    }

}