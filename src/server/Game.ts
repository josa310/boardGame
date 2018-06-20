import { Player } from "./Player";

export class Game
{
    protected _id: number;
    protected _name: string;
    protected _isActive: boolean;
    protected _players: Player[];

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

    constructor(name: string, id: number)
    {
        this._id = id;
        this._name = name;
        this._isActive = true;
        this._players = new Array<Player>();
    }
    
}