import { InteractionWindow } from "../../../ui/window/InteractionWindow";
import { Command, Commands } from "../../../../common/Command";
import { Team, PlayerRole } from "../../../../common/Enums";
import { CommandEvent } from "../../../event/CommandEvent";

enum Buttons
{
    PASS = "PASS!"
}

export class MainGameWindow extends InteractionWindow
{
    protected _command: Command;
    protected _commandEvent: CommandEvent;
    protected _teamDisplay: HTMLDivElement;
    protected _fieldColors: {[key: string]: string};

    constructor(root: HTMLElement)
    {
        super(root);

        this._fieldColors = {};
        this._command = new Command();
        this._commandEvent = new CommandEvent();
        this._commandEvent.command = this._command;

        this.setPlayerColors();
    }

    protected setPlayerColors(): void
    {
        this._fieldColors[Team.BLUE] = "#03a9f4";
        this._fieldColors[Team.RED] = "#F22613";
        this._fieldColors[Team.NEUTRAL] = "rgb(85, 85, 85)";
        this._fieldColors[-2] = "rgb(209, 209, 209)";
        this._fieldColors[-1] = "#2C3E50";
    }

    protected createElements(): void
    {
        super.createElements();

        this._teamDisplay = document.createElement("div");
        this._teamDisplay.id = "teamDisplay";
        this._window.appendChild(this._teamDisplay);

        for (let i: number = 0; i < 5; i++)
        {
            let row: HTMLElement = document.createElement("p");
            this._window.appendChild(row);
            for (let j: number = 0; j < 5; j++)
            {
                row.appendChild(this._buttons[(i*5 + j).toString()].node);
            }
        }

        let passButtonContainer: HTMLElement = document.createElement("div");
        let passButton: HTMLElement = this._buttons[Buttons.PASS].node;
        passButtonContainer.appendChild(passButton);
        passButton.classList.add("passButton");

        this._window.appendChild(passButtonContainer);
    }

    protected initButtons(): void
    {
        for (let idx: number = 0; idx < 25; idx++)
        {
            let button: HTMLElement = this.initButton(idx.toString(), () => this.onButton(idx), "").node;
            button.classList.add("field");
        }

        this.initButton(Buttons.PASS, () => this.onButton(-1), Buttons.PASS);
    }

    protected onButton(idx: number): void
    {
        this._command.clear();
        this._command.push(Commands.GAME_DATA).push(idx);

        this.dispatch(this._commandEvent);
    }

    public show(command: Command): void
    {
        super.show(command);

        const team: string = command.next();
        const playerRole: number = command.nextInt();
        const activeTeam: string = command.next();
        const isActive = (team == activeTeam)

        this._teamDisplay.style.backgroundColor = this._fieldColors[team];
        this._teamDisplay.innerText = (isActive) ? "Your turn." : "Please wait!";
        
        if (team == Team.NEUTRAL.toString())
        {
            this._teamDisplay.innerText = "";
            this._teamDisplay.style.backgroundColor = this._fieldColors[activeTeam];
        }
        
        const showPassButton: boolean = isActive && (playerRole != PlayerRole.MASTER);
        this._buttons[Buttons.PASS].node.style.display = showPassButton ? "" : "none";

        this.enableButtons(isActive);

        let text: string = command.next();
        let idx: number = 0;
        while (text)
        {
            this._buttons[idx].setText(text);
            this._buttons[idx].node.style.backgroundColor = this._fieldColors[command.next()];

            text = command.next();
            idx++;
        }
    }

    protected enableButtons(enable: boolean): void
    {
        for (let key in this._buttons)
        {
            this._buttons[key].enable(enable);
        }
    }
}