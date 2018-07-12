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
    protected _teamPoints: {[key: number]: number};
    protected _targetPoints: {[key: number]: number};

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
        this._teamPoints = {};
        this._targetPoints = {};
        this._activeTeam = Team.BLUE;

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
                break;

            case Commands.RESTART_GAME.toString():
                this.initGame();
                break;
        }
    }

    protected processGameCommand(player: Player): void
    {
        let buttonIdx: number = this._command.nextInt();

        if (player.role == PlayerRole.MASTER || this._board.isRevealed(buttonIdx) || !this._isActive)
        {
            return;
        }
        
        if (buttonIdx == -1)
        {
            this.nextTurn();
        }
        else
        {
            const fieldOccupation: number = this._board.pickField(buttonIdx);
            if (fieldOccupation == -1)
            {
                this.nextTeam();
                this.gameOver(this._activeTeam);
            }
            else
            {
                if (this._teamPoints[fieldOccupation] != undefined)
                {
                    this._teamPoints[fieldOccupation]++;
                    if (this._teamPoints[fieldOccupation] == this._targetPoints[fieldOccupation])
                    {
                        this.gameOver(fieldOccupation);
                        return;
                    }
                    else if (fieldOccupation != player.team)
                    {
                        this.nextTurn();
                    }
                }
                else
                {
                    this.nextTurn();
                }
            }
            this.notifyPlayers();
        }
    }

    protected gameOver(winningTeam: Team): void
    {
        this.notifyPlayers();
        
        this._command.clear();
        this._command.push(Commands.GAME_OVER).push(winningTeam);
        for (let key in this._players)
        {
            const player: Player = this._players[key];
            if (player)
            {
                player.send(this._command.toString());
            }
        }

        this._isActive = false;
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
        this._command.push(Commands.GAME_DATA).push(player.team).push(player.role).push(this._activeTeam);
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
        this._teamPoints[team] = 0;
        this._numTeams++;
    }

    protected initGame(): void
    {
        this._activeTeam = this._teams[(this._turn + 1) % this._numTeams];
        for (let key in this._teamPoints)
        {
            this._teamPoints[key] = 0;
            this._targetPoints[key] = Board.TEAM_FIELD_CNT;
            if (this._activeTeam.toString() != key)
            {
                this._targetPoints[key]--;
            }
        }

        this._isActive = true;
        this._board.reset(this._activeTeam);
        this.nextTurn();
    }
    
    protected nextTurn(): void
    {
        this.nextTeam();
        this.notifyPlayers();
    }

    protected nextTeam(): void
    {
        this._turn++;
        this._activeTeam = this._teams[this._turn % this._numTeams];
    }
}