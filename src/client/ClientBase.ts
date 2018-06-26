import { UIHandler } from './ui/UIHandler';
import { CommandHandler } from './CommandHandler';
import { InteractionWindow } from './ui/window/InteractionWindow';

export class ClientBase 
{
    protected _uiHandler: UIHandler;
    protected _commWindow: InteractionWindow;
    protected _commandHandler: CommandHandler;

    constructor(address: string = "ws://127.0.0.1:1337")
    {
        // this._commWindow = new InteractionWindow(this._connection ,document.body);

        this.createCommandHandler(address);
        this.createUI();
    }

    protected createCommandHandler(address: string): void
    {
        this._commandHandler = new CommandHandler(address);
        // this._connection.addListener((data: string) => this.onData(data));
    }

    protected createUI(): void
    {
        this._uiHandler = new UIHandler(this._commandHandler);
    }
}