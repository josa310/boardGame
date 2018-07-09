import { Game } from "../Game";
import { GameTypes } from "../../../common/GameTypes";
import { PlayerEvent } from "../../event/PlayerEvent";
import { Team, PlayerRole } from "../../../common/Enums";
import { Commands } from "../../../common/Command";
import { Board } from "./Board";
import { Player } from "../../player/Player";

export class CodeNames extends Game
{
    protected _board: Board;
    protected _numTeams: number;
    protected _numMasters: number;

    protected _turn: number;
    protected _teams: Team[];
    protected _activeTeam: Team;

    constructor(name: string, id: number)
    {
        super(name, id);

        this._turn = 0;
        this._numTeams = 0;
        this._numMasters = 0;
        this._isActive = false;
        this._board = new Board();
        this._teams = new Array<Team>();
        this._type = GameTypes.CODE_NAMES;

        this.addTeam(Team.RED);
        this.addTeam(Team.BLUE);
    }

    protected onPlayerMessage(e: PlayerEvent): void
    {
        this._command.processData(e.message.utf8Data);
        let player = this._players[e.idx];

        switch (this._command.next())
        {
            case Commands.INIT_GAME.toString():
                this.sendAvalibleRoles(e.idx);
                break;

            case Commands.SELECT_ROLE.toString():
                this.setPlayerRole(e.idx);
                break;
            
            case Commands.GAME_DATA.toString():
                this.processGameCommand(player);
        }
    }

    protected processGameCommand(player: Player): void
    {
        let buttonIdx: number = this._command.nextInt();
        
        if (buttonIdx == -1)
        {
            this.nextTurn();
        }
        else
        {
            this._board.pickField(buttonIdx);
            this.notifyPlayers();
        }
    }

    protected setPlayerRole(idx: number): void
    {
        let team: string = this._command.next();
        let role: number = parseInt(this._command.next());
        
        let roleIdx: number = this._avalibleRoles[team].indexOf(role);
        if (roleIdx >= 0)
        {
            this._players[idx].team = parseInt(team);
            this._players[idx].role = role;

            if (role == PlayerRole.MASTER)
            {
                this._avalibleRoles[team].splice(roleIdx, 1);
                if (++this._numMasters == this._numTeams)
                {
                    this.initGame();
                    return;
                }
            }

            this._isActive ? this.sendBoard(idx) : this.sendWaitMessage(idx);
        }
        else
        {
            this.sendAvalibleRoles(idx);
        }
    }

    protected sendBoard(idx: number): void
    {
        if (!this._isActive)
        {
            return;
        }

        const player: Player = this._players[idx];
        const board: string[] = this._board.getBoard(player.role == PlayerRole.MASTER);
        
        this._command.clear();
        this._command.push(Commands.GAME_DATA).push(player.team).push(this._activeTeam);
        for (let data of board)
        {
            this._command.push(data);
        }
        
        player.send(this._command.toString());
    }

    protected sendWaitMessage(idx: number): void
    {
        this._command.clear();
        this._command.push(Commands.WAIT);
        
        this._players[idx].send(this._command.toString());
    }

    protected sendAvalibleRoles(idx: number): void
    {
        this._command.clear();

        this._command.push(Commands.SELECT_ROLE);
        for (let team in this._avalibleRoles)
        {
            for (let role of this._avalibleRoles[team])
            {
                this._command.push(team);
                this._command.push(role);
            }
        }

        this._players[idx].send(this._command.toString());
    }

    protected notifyPlayers(): void 
    {
        for (let key in this._players)
        {
            const player: Player = this._players[key];
            if (player)
            {
                this.sendBoard(player.idx);
            }
        }
    }

    protected setAvalibleRoles(): void 
    {
        super.setAvalibleRoles();

        this._avalibleRoles[Team.RED].push(PlayerRole.MASTER);
        this._avalibleRoles[Team.BLUE].push(PlayerRole.MASTER);
        // this._avalibleRoles[Team.GREEN].push(PlayerRole.MASTER);
        this._avalibleRoles[Team.RED].push(PlayerRole.PLAYER);
        this._avalibleRoles[Team.BLUE].push(PlayerRole.PLAYER);
        // this._avalibleRoles[Team.GREEN].push(PlayerRole.PLAYER);
        this._avalibleRoles[Team.NEUTRAL].push(PlayerRole.PLAYER);
    }

    protected addTeam(team: Team): void
    {
        this._teams.push(team);
        this._numTeams++;
    }

    protected initGame(): void
    {
        this._isActive = true;
        this._board.reset();
        this.nextTurn();
    }
    
    protected nextTurn(): void
    {
        this._turn++;
        this._activeTeam = this._teams[this._turn % this._numTeams];
    
        this.notifyPlayers();
    }
}