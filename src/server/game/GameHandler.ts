import { GameTypes } from './../../common/GameTypes';
import { Game } from "./Game";
import { Command, Commands } from './../../common/Command';
import { PlayerEvent } from '../event/PlayerEvent';
import { PlayerHandler } from '../player/PlayerHandler';
import { EventDispatcher } from "../../common/EventDispatcher";
import { GameFactory } from "./GameFactory";

export class GameHandler extends EventDispatcher
{
    protected _command: Command;
    protected _numberOfGames: number;
    protected _games: {[key: string]: Game};
    protected _playerHandler: PlayerHandler;
    protected _gameFactory: GameFactory;
    protected _gameIds: number;

    get games(): {[key: string]: Game}
    {
        return this._games;
    }

    constructor(playerHandler: PlayerHandler)
    {
        super();
        this._games = {};
        this._gameIds = 0;
        this._command = new Command();
        this._playerHandler = playerHandler;

        this._playerHandler.addListener(PlayerEvent.CONNECT, (e: PlayerEvent) => this.onPlayerConnect(e));
        this._playerHandler.addListener(PlayerEvent.MESSAGE, (e: PlayerEvent) => this.onPlayerMessage(e));
        this._playerHandler.addListener(PlayerEvent.DISCONNECT, (e: PlayerEvent) => this.onPlayerLeave(e));
    }
   
    protected onPlayerConnect(e: PlayerEvent): void
    {
        this.sendGameList(e.idx);
    }

    protected onPlayerMessage(e: PlayerEvent): void
    {
        if (e.message.type == "utf8")
        {
            this._command.processData(e.message.utf8Data);
            switch (this._command.next())
            {
                case Commands.START_NEW_GAME.toString():
                    this.startNewGame();
                    break;

                default:
                    this.dispatch(e);
            }
        }
        else
        {
            console.log("Invalid message type.");
        }
    }

    protected onPlayerLeave(e: PlayerEvent): void
    {
        this.dispatch(e);
    }

    protected sendGameList(idx: number): void
    {
        this._command.clear();
        this._command.push(Commands.UI_MESSAGE).push(Commands.GAME_LIST);
        for (let key in this._games)
        {
            this._command.push(key);
        }
        
        this._playerHandler.getPlayerById(idx).send(this._command.toString());
    }

    protected startNewGame(): void
    {
        this._games[this._gameIds++] = this._gameFactory.createGame(
            this._command.next() as GameTypes, 
            this._command.next(), 
            this._gameIds
        );
    }
}