import { CommandEvent } from './../../../event/CommandEvent';
import { Command, Commands } from './../../../../common/Command';
import { InteractionWindow } from "../../../ui/window/InteractionWindow";
import { Team } from '../../../../common/Enums';

enum Buttons
{
    NEW_GAME = "New Game"
}

export class GameOverWindow extends InteractionWindow
{
    protected _command: Command;
    protected _commandEvent: CommandEvent;

    protected _gameOverText: HTMLDivElement;
    protected _winningTeamText: HTMLDivElement;
    protected _buttonContainer: HTMLDivElement;
    protected _teamNames: {[key: string]: string};

    constructor(root: HTMLElement)
    {
        super(root);

        this._command = new Command();
        this._commandEvent = new CommandEvent();
        this._commandEvent.command = this._command;

        this.setTeamNames();
    }

    protected setTeamNames(): void
    {
        this._teamNames = {};
        this._teamNames[Team.RED] = "Red";
        this._teamNames[Team.BLUE] = "Blue";
    }

    protected createElements(): void
    {
        super.createElements();

        this._gameOverText = document.createElement("div");
        this._winningTeamText = document.createElement("div");
        this._buttonContainer = document.createElement("div");

        this._gameOverText.innerText = "GAME OVER";
        this._buttonContainer.appendChild(this._buttons[Buttons.NEW_GAME].node);

        this._gameOverText.classList.add("gameOverText");
        this._winningTeamText.classList.add("gameOverText");

        this._window.classList.add("gameOverWindow");
        this._window.appendChild(this._gameOverText);
        this._window.appendChild(this._winningTeamText);
        this._window.appendChild(this._buttonContainer);
    }

    protected initButtons(): void
    {
        this.initButton(Buttons.NEW_GAME, () => this.onNewGame(), Buttons.NEW_GAME, undefined, "menuButton");
    }

    protected onNewGame(): void
    {
        this._command.clear();
        this._command.push(Commands.RESTART_GAME);

        this.dispatch(this._commandEvent);
    }

    public show(command: Command): void
    {
        super.show(command);

        this._winningTeamText.innerText = this._teamNames[command.next()] + " team won!";
    }
}