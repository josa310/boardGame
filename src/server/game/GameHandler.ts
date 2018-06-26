import { Game } from "./Game";
import { Command, Commands } from './../../common/Command';
import { PlayerEvent } from '../event/PlayerEvent';
import { PlayerHandler } from '../player/PlayerHandler';
import { EventDispatcher } from "../../common/EventDispatcher";

export class GameHandler extends EventDispatcher
{
    protected _command: Command;
    protected _numberOfGames: number;
    protected _games: {[key: string]: Game};
    protected _playerHandler: PlayerHandler;

    get games(): {[key: string]: Game}
    {
        return this._games;
    }

    constructor(playerHandler: PlayerHandler)
    {
        super();
        this._games = {};
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
        this.dispatch(e);
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
}