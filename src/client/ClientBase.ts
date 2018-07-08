import { UIHandler } from './ui/UIHandler';
import { CommandHandler } from './CommandHandler';
import { InteractionWindow } from './ui/window/InteractionWindow';
import { GameHandler } from './game/GameHandler';

export class ClientBase 
{
    protected _uiHandler: UIHandler;
    protected _gameHandler: GameHandler;
    protected _commWindow: InteractionWindow;
    protected _commandHandler: CommandHandler;

    constructor(address: string = "ws://127.0.0.1:1337")
    {
        this.createCommandHandler(address);
        this.createGameHandler();
        this.createUI();
    }

    protected createCommandHandler(address: string): void
    {
        this._commandHandler = new CommandHandler(address);
    }

    protected createUI(): void
    {
        this._uiHandler = new UIHandler(this._commandHandler);
    }

    protected createGameHandler(): void
    {
        this._gameHandler = new GameHandler(this._commandHandler);
    }
}