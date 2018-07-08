import { InteractionWindow } from "../../../ui/window/InteractionWindow";
import { Command } from "../../../../common/Command";
import { Team } from "../../../../common/Enums";

export class MainGameWindow extends InteractionWindow
{
    protected _playerColors: {[key: string]: string};

    constructor(root: HTMLElement)
    {
        super(root);

        this._playerColors = {};

        this.setPlayerColors();
    }

    protected setPlayerColors(): void
    {
        this._playerColors[Team.BLUE] = "blue";
        this._playerColors[Team.RED] = "red";
        this._playerColors[Team.NEUTRAL] = "grey";
    }

    protected createElements(): void
    {
        super.createElements();

        for (let i: number = 0; i < 5; i++)
        {
            let row: HTMLElement = document.createElement("p");
            this._window.appendChild(row);
            for (let j: number = 0; j < 5; j++)
            {
                row.appendChild(this._buttons[(i*5 + j).toString()].node);
            }
        }
    }

    protected initButtons(): void
    {
        for (let idx: number = 0; idx < 25; idx++)
        {
            this.initButton(idx.toString(), () => this.onButton(idx), "");
        }
    }

    protected onButton(idx: number): void
    {
        console.log(idx);
    }

    public show(command: Command): void
    {
        super.show(command);

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
}