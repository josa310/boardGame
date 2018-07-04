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
        this._gameFactory = this.createGameFactory();

        this._playerHandler.addListener(PlayerEvent.CONNECT, (e: PlayerEvent) => this.onPlayerConnect(e));
        this._playerHandler.addListener(PlayerEvent.MESSAGE, (e: PlayerEvent) => this.onPlayerMessage(e));
        this._playerHandler.addListener(PlayerEvent.DISCONNECT, (e: PlayerEvent) => this.onPlayerLeave(e));
    }
   
    protected createGameFactory(): GameFactory
    {
        return new GameFactory();
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
                    let newGame: Game = this.startNewGame();
                    this.joinPlayer(e.idx, newGame.id);
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
            this._command.push(this._games[key].name);
            this._command.push(this._games[key].id);
        }
        
        this.sendCommand(idx);
    }

    protected startNewGame(): Game
    {
        const gameType: GameTypes = <GameTypes>this._command.next();
        const gameName: string = this._command.next();
        const gameId: number = this._gameIds;

        this._games[this._gameIds] = this._gameFactory.createGame(gameType, gameName, gameId);

        return this._games[this._gameIds++];
    }

    protected joinPlayer(playerId: number, gameId: number): void
    {
        this._command.clear();
        this._command.push(Commands.JOIN_GAME).
            push(this._games[gameId].type).
            push(this._games[gameId].name).
            push(gameId);

        this.sendCommand(playerId);
    }

    protected sendCommand(playerId: number): void
    {
        this._playerHandler.getPlayerById(playerId).send(this._command.toString());
    }
}