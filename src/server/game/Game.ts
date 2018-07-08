import { Player } from "../player/Player";
import { GameTypes } from "../../common/GameTypes";
import { PlayerEvent } from "../event/PlayerEvent";
import { Command, Commands } from "../../common/Command";
import { PlayerRole, Team } from "../../common/Enums";

export abstract class Game
{
    protected _id: number;
    protected _name: string;
    protected _type: GameTypes;
    protected _command: Command;
    protected _isActive: boolean;
    protected _players: {[key: number]: Player};
    protected _avalibleRoles: {[key: string]: PlayerRole[]};

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

    public get players(): {[key: number]: Player}
    {
        return this._players;
    }

    public get type(): GameTypes
    {
        return this._type;
    }

    constructor(name: string, id: number)
    {
        this._id = id;
        this._name = name;
        this._isActive = true;
        this._command = new Command();
        this._type = GameTypes.DEFAULT;
        this._players = new Array<Player>();
        this._avalibleRoles = {};

        this.setAvalibleRoles();
    }
    
    public addPlayer(player: Player): boolean
    {
        this._players[player.idx] = player;
        player.addListener(PlayerEvent.MESSAGE, (e: PlayerEvent) => this.onPlayerMessage(e));
        
        this.sendStartCommand(player);
        return true;
    }
    
    protected sendStartCommand(player: Player): void
    {
        this._command.clear();
        this._command.push(Commands.START_NEW_GAME).
        push(this._type).
        push(this._id).
        push(this._name);
        
        player.send(this._command.toString());
    }
    
    public removePlayer(player: Player): boolean
    {
        this._players[player.idx] = undefined;
        
        return true;
    }
    
    public get avalibleRoles(): {[key: string]: PlayerRole[]}
    {
        return this._avalibleRoles;
    }
    
    protected setAvalibleRoles(): void
    {
        this._avalibleRoles[Team.RED] = new Array<PlayerRole>();
        this._avalibleRoles[Team.BLUE] = new Array<PlayerRole>();
        // this._avalibleRoles[Team.GREEN] = new Array<PlayerRole>();
        this._avalibleRoles[Team.NEUTRAL] = new Array<PlayerRole>();
    }

    protected abstract notifyPlayers(): void;
    protected abstract onPlayerMessage(e: PlayerEvent): void;
    
}