import { InteractionWindow } from "../../../ui/window/InteractionWindow";
import { Command, Commands } from "../../../../common/Command";
import { Team } from "../../../../common/Enums";
import { CommandEvent } from "../../../event/CommandEvent";

enum Buttons
{
    PASS = "Pass"
}

export class MainGameWindow extends InteractionWindow
{
    protected _command: Command;
    protected _commandEvent: CommandEvent;
    protected _teamDisplay: HTMLDivElement;
    protected _playerColors: {[key: string]: string};

    constructor(root: HTMLElement)
    {
        super(root);

        this._playerColors = {};
        this._command = new Command();
        this._commandEvent = new CommandEvent();
        this._commandEvent.command = this._command;

        this.setPlayerColors();
    }

    protected setPlayerColors(): void
    {
        this._playerColors[Team.BLUE] = "blue";
        this._playerColors[Team.RED] = "red";
        this._playerColors[Team.NEUTRAL] = "grey";
        this._playerColors[-1] = "yellow";
    }

    protected createElements(): void
    {
        super.createElements();

        this._teamDisplay = document.createElement("div");
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
        passButtonContainer.appendChild(this._buttons[Buttons.PASS].node);

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

        let team: string = command.next();
        this._teamDisplay.style.backgroundColor = this._playerColors[team];

        const isActive: boolean = team == command.next();
        this._teamDisplay.innerText = (isActive) ? "Your turn." : "Varja meg!";
        
        this.enableButtons(isActive);

        let text: string = command.next();
        let idx: number = 0;
        while (text)
        {
            this._buttons[idx].setText(text);
            this._buttons[idx].node.style.backgroundColor = this._playerColors[command.next()];

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