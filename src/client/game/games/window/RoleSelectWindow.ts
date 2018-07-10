import { InteractionWindow } from "../../../ui/window/InteractionWindow";
import { InputTypes } from "../../../ui/elements/InputFactory";
import { Command, Commands } from "../../../../common/Command";
import { PlayerRole } from "../../../../common/Enums";
import { Team } from "../../../../common/Enums";
import { Selection } from "../../../ui/elements/Selection";
import { CommandEvent } from "../../../event/CommandEvent";

enum InputList
{
    TEAM,
    ROLE
}

enum ButtonList
{
    OK = "OK"
}

export class RoleSelectWindow extends InteractionWindow
{
    protected _roleNames: {[key: string]: string};
    protected _teamNames: {[key: string]: string};

    protected _teams: {[key: string]: string[]};

    protected _command: Command;
    protected _commandEvent: CommandEvent;

    constructor(root: HTMLElement)
    {
        super(root);
        this._command = new Command();
        this._commandEvent = new CommandEvent();
        this._commandEvent.command = this._command;
        this.initRoleNames();
    }

    protected initRoleNames(): void
    {
        this._roleNames = {};
        this._roleNames[PlayerRole.PLAYER] = "Player";
        this._roleNames[PlayerRole.MASTER] = "Spy Master";

        this._teamNames = {};
        this._teamNames[Team.RED] = "Red";
        // this._teamNames[Team.GREEN] = "Green";
        this._teamNames[Team.BLUE] = "Blue";
        this._teamNames[Team.NEUTRAL] = "Neutral";
    }

    protected createElements(): void
    {
        super.createElements();
        
        let teamSelectSection = document.createElement("p");
        teamSelectSection.appendChild(this._inputs[InputList.TEAM].node);

        let roleSelectSection = document.createElement("p");
        roleSelectSection.appendChild(this._inputs[InputList.ROLE].node);
        
        let buttonContainer = document.createElement("p");
        buttonContainer.appendChild(this._buttons[ButtonList.OK].node);

        this._window.id = "interactionWindow";
        this._window.appendChild(teamSelectSection);
        this._window.appendChild(roleSelectSection);
        this._window.appendChild(buttonContainer);
    }

    protected initInputs(): void
    {
        this.createInput(InputList.TEAM, InputTypes.SELECTION, undefined, "inputField selection");
        this.createInput(InputList.ROLE, InputTypes.SELECTION, undefined, "inputField selection");
    }

    protected initButtons(): void
    {
        this.initButton(ButtonList.OK, () => this.onOK(), ButtonList.OK, undefined, "menuButton");
    }
 
    protected onOK(): void
    {
        this._command.clear();
        this._command.push(Commands.SELECT_ROLE).
            push(this._inputValues[InputList.TEAM]).
            push(this._inputValues[InputList.ROLE]);

        this.dispatch(this._commandEvent);

        this.hide();
    }

    protected onInputUpdate(idx: number, value: string): void
    {
        super.onInputUpdate(idx, value);

        if (idx == InputList.TEAM)
        {
            this.updateRoleSelection();
        }
    }

    protected updateRoleSelection(): void
    {
        let roleNames: string[] = new Array<string>();
        let roleIDs: string[] = new Array<string>();
        let roles: string[] = this._teams[this._inputValues[InputList.TEAM]];
        for (let role of roles)
        {
            roleIDs.push(role);
            roleNames.push(this._roleNames[role]);
        }
        (this._inputs[InputList.ROLE] as Selection).setDataWithValues(roleNames, roleIDs);
        this._inputValues[InputList.ROLE] = roleIDs[0];
    }

    public show(data: Command): void
    {
        super.show(data);

        this._teams = {};
        let next: string = data.next();
        while (next)
        {
            if (!this._teams[next])
            {
                this._teams[next] = new Array<string>();
            }
            this._teams[next].push(data.next());
            next = data.next();
        }
        
        let teamNames: string[] = new Array<string>();
        let teamIDs: string[] = new Array<string>();
        for (let key in this._teams)
        {
            teamIDs.push(key);
            teamNames.push(this._teamNames[key]);
        }

        (this._inputs[InputList.TEAM] as Selection).setDataWithValues(teamNames, teamIDs);
        this._inputValues[InputList.TEAM] = teamIDs[0];

        this.updateRoleSelection();
    }
}