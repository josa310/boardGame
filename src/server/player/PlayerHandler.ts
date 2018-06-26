import { Player } from "./Player";
import { PlayerEvent } from "../event/PlayerEvent";
import { EventDispatcher } from "../../common/EventDispatcher";

export class PlayerHandler extends EventDispatcher
{
    protected _players: {[key: string]: Player};
    protected _connectEvent: PlayerEvent;
    
    public get players(): {[key: string]: Player}
    {
        return this._players;
    }

    constructor()
    {
        super();
        this._players = {};
        this._connectEvent = new PlayerEvent(PlayerEvent.CONNECT);
    }

    public newConnect(player: Player)
    {
        if (!this._players[player.idx])
        {
            this._players[player.idx] = player;
            player.addListener(PlayerEvent.MESSAGE, (e: PlayerEvent) => this.onMessage(e));
            player.addListener(PlayerEvent.DISCONNECT, (e: PlayerEvent) => this.onPlayerLeave(e));

            this._connectEvent.idx = player.idx;
            this.dispatch(this._connectEvent);
        }
        else
        {
            console.log("Already joined.");
        }
    }

    protected onMessage(e: PlayerEvent): void
    {
        this.dispatch(e);
    }

    protected onPlayerLeave(e: PlayerEvent): void
    {
        this.dispatch(e);
    }

    public getPlayerById(idx: number): Player
    {
        let player: Player = this._players[idx];
        return player ? player : null;
    }
}