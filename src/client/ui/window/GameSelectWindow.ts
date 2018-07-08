import { InteractionWindow } from "./InteractionWindow";
import { InputTypes } from "../elements/InputFactory";
import { CommandEvent } from "../../event/CommandEvent";
import { Command, Commands } from "../../../common/Command";
import { GameTypes } from "../../../common/GameTypes";
import { Selection } from "../elements/Selection";

enum InputList
{
    GAME_SELECT,
    NEW_GAME_NAME_FIELD,
    NEW_GAME_TYPE_FIELD,
}

enum ButtonList
{
    JOIN = "Join",
    START_NEW = "Start"
}

export class GameSelectWindow extends InteractionWindow
{
    protected _command: Command;
    protected _commandEvent: CommandEvent;

    constructor(root: HTMLElement)
    {
        super(root);
        this._command = new Command();
        this._commandEvent = new CommandEvent();
        this._commandEvent.command = this._command;
    }

    protected createElements(): void
    {
        super.createElements();
        
        let gameSelectSection = document.createElement("p");
        gameSelectSection.appendChild(this._inputs[InputList.GAME_SELECT].node);
        gameSelectSection.appendChild(this._buttons[ButtonList.JOIN].node);

        let newGameSection = document.createElement("p");
        newGameSection.appendChild(this._inputs[InputList.NEW_GAME_NAME_FIELD].node);
        newGameSection.appendChild(this._inputs[InputList.NEW_GAME_TYPE_FIELD].node);
        newGameSection.appendChild(this._buttons[ButtonList.START_NEW].node);

        this._window.appendChild(gameSelectSection);
        this._window.appendChild(newGameSection);
    }

    protected initInputs(): void
    {
        this.createInput(InputList.GAME_SELECT, InputTypes.SELECTION);
        this.createInput(InputList.NEW_GAME_NAME_FIELD, InputTypes.TEXT);
        this.createInput(InputList.NEW_GAME_TYPE_FIELD, InputTypes.SELECTION);
    }

    protected initButtons(): void
    {
        this.initButton(ButtonList.JOIN, () => this.onJoin(), ButtonList.JOIN);
        this.initButton(ButtonList.START_NEW, () => this.onStartNew(), ButtonList.START_NEW);
    }

    protected onJoin(): void
    {
        this._command.clear();
        this._command.push(Commands.JOIN_GAME).push(this._inputValues[InputList.GAME_SELECT])

        this.dispatch(this._commandEvent);

        this.hide();
    }

    protected onStartNew(): void
    {
        this._command.clear();
        this._command.push(Commands.START_NEW_GAME)
            .push(this._inputValues[InputList.NEW_GAME_TYPE_FIELD])
            .push(this._inputValues[InputList.NEW_GAME_NAME_FIELD]);

        this.dispatch(this._commandEvent);

        this.hide();
    }

    public show(command: Command): void
    {
        super.show(command);

        let gameList: string[] = new Array<string>();
        let gameIDs: string[] = new Array<string>();
        let gameName: string = command.next();
        while (gameName)
        {
            gameList.push(gameName);
            gameIDs.push(command.next());
            gameName = command.next();
        }

        this._buttons[ButtonList.JOIN].enable(gameList.length > 0);
        (this._inputs[InputList.GAME_SELECT] as Selection).setDataWithValues(gameList, gameIDs);

        this._inputs[InputList.NEW_GAME_NAME_FIELD].setData([""]);

        let gameTypes: string[] = new Array<string>();
        for (let game in GameTypes)
        {
            if (GameTypes[game] == GameTypes.DEFAULT)
            {
                continue;
            }
            gameTypes.push(GameTypes[game]);
        }
        this._inputs[InputList.NEW_GAME_TYPE_FIELD].setData(gameTypes);
        this._inputValues[InputList.GAME_SELECT] = this._inputs[InputList.GAME_SELECT].value;
        this._inputValues[InputList.NEW_GAME_TYPE_FIELD] = this._inputs[InputList.NEW_GAME_TYPE_FIELD].value;
    }
}