import { Player, PlayerRole } from "./player/Player";

export class Game
{
    protected _id: number;
    protected _name: string;
    protected _isActive: boolean;
    protected _players: Player[];
    protected _avalibleRoles: PlayerRole[];

    public set isActive(value: boolean)
    {
        this._isActive = value;
    }

    public get name(): string
    {
        return this._name;
    }

    public get id(): number
    {
        return this._id;
    }

    public get players(): Player[]
    {
        return this._players;
    }

    constructor(name: string, id: number)
    {
        this._id = id;
        this._name = name;
        this._isActive = true;
        this._players = new Array<Player>();
    }

    protected setAvalibleRoles(): void
    {

    }
    
    public addPlayer(player: Player): boolean
    {
        this._players.push(player);
        return true;
    }

    public removePlayer(player: Player): boolean
    {
        let idx: number = this.players.indexOf(player);
        if (idx > -1)
        {
            this._players.splice(idx, 1);
        }

        return true;
    }

    public get avalibleRoles(): PlayerRole[]
    {
        return this._avalibleRoles;
    }

    protected notifyPlayers(): void
    {

    }
    
}