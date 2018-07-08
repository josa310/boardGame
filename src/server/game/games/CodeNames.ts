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

    constructor(name: string, id: number)
    {
        super(name, id);

        this._isActive = false;
        this._board = new Board();
        this._type = GameTypes.CODE_NAMES;
    }

    protected onPlayerMessage(e: PlayerEvent): void
    {
        this._command.processData(e.message.utf8Data);

        switch (this._command.next())
        {
            case Commands.INIT_GAME.toString():
                this.sendAvalibleRoles(e.idx);
                return;

            case Commands.SELECT_ROLE.toString():
                this.setPlayerRole(e.idx);
                break;
        }
    }

    protected setPlayerRole(idx: number): void
    {
        let team: string = this._command.next();
        let role: number = parseInt(this._command.next());
        
        let roleIdx: number = this._avalibleRoles[team].indexOf(role);
        if (roleIdx >= 0)
        {
            if (role == PlayerRole.MASTER)
            {
                this._avalibleRoles[team].splice(roleIdx, 1);
            }
            this._players[idx].team = parseInt(team);
            this._players[idx].role = role;
            this.sendBoard(idx);
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
            this._board.reset();
            this._isActive = true;
        }

        const player: Player = this._players[idx];
        const board: string[] = this._board.getBoard(player.role == PlayerRole.MASTER);
        
        this._command.clear();
        this._command.push(Commands.GAME_DATA);
        for (let data of board)
        {
            this._command.push(data);
        }
        
        player.send(this._command.toString());
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

    protected initGame(): void
    {

    }
}