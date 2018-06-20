import { Game } from "./Game";
import { connection } from "../../node_modules/@types/websocket/index";

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

export class Player
{
    protected _role: PlayerRole;
    protected _team: Team;
    protected _game: Game;
    protected _isPlaying: boolean;
    protected _connection: connection

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

    constructor(connection: connection)
    {
        this._connection = connection;
        this.reset();
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
}