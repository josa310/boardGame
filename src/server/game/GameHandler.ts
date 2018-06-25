import { Player } from '../player/Player';
import { Game } from "./Game";
import { PlayerHandler } from '../player/PlayerHandler';
import { PlayerEvent } from '../event/PlayerEvent';

export class GameHandler
{
    protected _games: {[key: string]: Game};
    protected _playerHandler: PlayerHandler;

    get games(): {[key: string]: Game}
    {
        return this._games;
    }

    constructor(playerHandler: PlayerHandler)
    {
        this._games = {};
        this._playerHandler = playerHandler;

        this._playerHandler.addListener(PlayerEvent.CONNECT, (e: PlayerEvent) => this.onPlayerConnect(e));
        this._playerHandler.addListener(PlayerEvent.MESSAGE, (e: PlayerEvent) => this.onPlayerMessage(e));
        this._playerHandler.addListener(PlayerEvent.DISCONNECT, (e: PlayerEvent) => this.onPlayerLeave(e));
    }
   
    protected onPlayerConnect(e: PlayerEvent): void
    {
        console.log("I know. Player Connected.");
    }

    protected onPlayerMessage(e: PlayerEvent): void
    {
        console.log(e.message);
    }

    protected onPlayerLeave(e: PlayerEvent): void
    {
        console.log("Poor Johny.");
    }
}