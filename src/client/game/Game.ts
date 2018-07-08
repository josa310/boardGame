import { GameTypes } from "../../common/GameTypes";
import { CommandHandler } from "../CommandHandler";
import { Command } from "../../common/Command";

export class Game
{
    protected _id: string;
    protected _name: string;
    protected _type: GameTypes;
    protected _command: Command;
    protected _commandHandler: CommandHandler;

    constructor(id: string, name: string, commandHandler: CommandHandler)
    {
        this._id = id;
        this._name = name;
        this._command = new Command();
        this._type = GameTypes.DEFAULT;
        this._commandHandler = commandHandler;

        this.setupListeners();
        this.initGame();
    }

    protected setupListeners(): void
    {
    }

    protected initGame(): void
    {
    }
}