import { CommandEvent } from './../../event/CommandEvent';
import { WaitForPlayersWindow } from './window/WaitForPlayersWindow';
import { Game } from "../Game";
import { CommandHandler } from "../../CommandHandler";
import { GameTypes } from "../../../common/GameTypes";
import { Commands } from "../../../common/Command";
import { RoleSelectWindow } from "./window/RoleSelectWindow";
import { InteractionWindow } from "../../ui/window/InteractionWindow";
import { MainGameWindow } from "./window/MainGameWindow";

enum Windows
{
    ROLE_SELECT,
    MAIN,
    GAME_OVER,
    WAIT
}

export class CodeNames extends Game
{
    protected _windows: {[name: string]: InteractionWindow};

    constructor(id: string, name: string, commandHandler: CommandHandler)
    {
        super(id, name, commandHandler);

        this._type = GameTypes.CODE_NAMES;

        this.createWindows();
    }

    protected setupListeners(): void
    {
        this._commandHandler.addListener(Commands.WAIT.toString(), (e: CommandEvent) => this.onWaitMessage(e));
        this._commandHandler.addListener(Commands.GAME_DATA.toString(), (e: CommandEvent) => this.onGameData(e));
        this._commandHandler.addListener(Commands.INIT_GAME.toString(), (e: CommandEvent) => this.onInitMessage(e));
        this._commandHandler.addListener(Commands.SELECT_ROLE.toString(), (e: CommandEvent) => this.onRoleSelectMessage(e));
    }

    protected createWindows(): void
    {
        this._windows = {};
        let root: HTMLElement = document.body;

        this._windows[Windows.MAIN] = new MainGameWindow(root);
        this._windows[Windows.WAIT] = new WaitForPlayersWindow(root);
        this._windows[Windows.ROLE_SELECT] = new RoleSelectWindow(root);

        this._windows[Windows.MAIN].addListener(CommandEvent.COMMAND, (e: CommandEvent) => this.onWindowEvent(e));
        this._windows[Windows.ROLE_SELECT].addListener(CommandEvent.COMMAND, (e: CommandEvent) => this.onWindowEvent(e));
    }

    protected initGame(): void
    {
        this._command.clear();
        this._command.push(Commands.INIT_GAME);

        this._commandHandler.dispatchCommand(this._command);
    }

    protected onInitMessage(e: CommandEvent): void
    {
        // Do nothing
    }

    protected onWaitMessage(e: CommandEvent): void
    {
        this._windows[Windows.WAIT].show(e.command);
    }

    protected onRoleSelectMessage(e: CommandEvent): void
    {
        this._windows[Windows.ROLE_SELECT].show(e.command);
    }

    protected onWindowEvent(e: CommandEvent): void
    {
        this._commandHandler.dispatchCommand(e.command);
    }

    protected onGameData(e: CommandEvent): void
    {
        this._windows[Windows.WAIT].hide();
        this._windows[Windows.MAIN].show(e.command);
    }
}