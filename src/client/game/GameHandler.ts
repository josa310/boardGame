import { Game } from "./Game";
import { CommandHandler } from "../CommandHandler";
import { CommandEvent } from "../event/CommandEvent";
import { Commands } from "../../common/Command";
import { GameFactory } from "./GameFactory";

export class GameHandler
{
    protected _game: Game;
    protected _commandHandler: CommandHandler;
    protected _gameFactory: GameFactory;

    constructor(commandHandler: CommandHandler)
    {
        this._commandHandler = commandHandler;
        this._gameFactory = new GameFactory(this._commandHandler);

        this.setupListeners();
    }

    protected setupListeners(): void
    {
        this._commandHandler.addListener(Commands.JOIN_GAME.toString(), (e: CommandEvent) => this.startNewGame(e));
        this._commandHandler.addListener(Commands.START_NEW_GAME.toString(), (e: CommandEvent) => this.startNewGame(e));
    }

    protected startNewGame(e: CommandEvent): void
    {
        this._game = this._gameFactory.createGame(e.command);
    }
}