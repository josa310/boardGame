import { Game } from "./Game";
import { connection, IMessage } from "websocket";
import { EventDispatcher } from './../common/EventDispatcher';
import { PlayerEvent } from "./event/PlayerEvent";

export enum PlayerRole
{
    PLAYER = "Player",
    MASTER = "Master",
    OBSERVER = "Observer"
}

export enum Team
{
    RED = "Red",
    BLUE = "Blue",
    GEEN = "Green"
}

export class Player extends EventDispatcher
{
    protected static idx: number = 0;

    protected _team: Team;
    protected _game: Game;
    protected _idx: number;
    protected _role: PlayerRole;
    protected _isPlaying: boolean;
    protected _connection: connection;
    protected _messageEvent: PlayerEvent;
    protected _disconnectEvent: PlayerEvent;

    set role(value: PlayerRole)
    {
        this._role = value;
    }

    set team(value: Team)
    {
        this._team = value;
    }

    set game(value: Game)
    {
        this._game = value;
    }

    get role(): PlayerRole
    {
        return this._role;
    }

    get team(): Team
    {
        return this._team;
    }

    get game(): Game
    {
        return this._game;
    }

    get idx(): number
    {
        return this._idx;
    }

    constructor(connection: connection)
    {
        super();
        this._idx = Player.idx++;
        this._connection = connection;

        this.reset();
        this.createEvents();
        this.setupEventListeners();
    }
    
    protected setupEventListeners(): void
    {
        this._connection.on("message", (e: IMessage) => this.onMessage(e));
        this._connection.on("close", () => this.onDisconnect());
    }

    protected createEvents(): void
    {
        this._messageEvent = new PlayerEvent(PlayerEvent.MESSAGE, this._idx);
        this._disconnectEvent = new PlayerEvent(PlayerEvent.DISCONNECT, this._idx);
    }

    public reset(): void
    {
        this._game = null;
        this._role = null;
        this._team = null;
        this._isPlaying = false;
    }

    public send(data: string): void
    {
        this._connection.sendUTF(data);
    }

    protected onDisconnect(): void
    {
        this.dispatch(this._disconnectEvent);
    }

    protected onMessage(message: IMessage): void
    {
        this._messageEvent.message = message;
        this.dispatch(this._messageEvent);
    }
}