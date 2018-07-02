import { Command } from "../../../common/Command";
import { Button } from "../elements/Button";
import { Input } from "../elements/Input";
import { InputFactory, InputTypes } from "../elements/InputFactory";

export enum InteractionWindowButtons
{
    OK = "OK",
    CANCEL = "Cancel",
    EXIT = "Exit",
    SEND = "Send"
}

export class InteractionWindow
{
    protected _root: HTMLElement;
    protected _window: HTMLDivElement;
    protected _inputFactory: InputFactory;
    
    protected _selection: HTMLSelectElement;

    protected _headline: HTMLDivElement;
    protected _buttons: {[key: string]: Button};

    protected _inputs: {[key: number]: Input};
    protected _inputValues: {[key: number]: string};

    constructor(root: HTMLElement)
    {
        this._root = root;

        this._inputs = {};
        this._buttons = {};
        this._inputValues = {};

        this.init();
    }
    
    protected init(): void
    {
        this.createInputFactory();
        this.initInputs();
        this.initButtons();
        this.createElements();        
    }

    protected createElements(): void
    {
        this._window = this.createDiv("interactionWindow");
        this._headline = this.createDiv("headline");
        this._selection = document.createElement("select");

        this._window.appendChild(this._headline);
        this._window.appendChild(this._selection);

        this._window.appendChild(this._inputs[0].node);
    }

    protected initButtons(): void
    {
       this.initButton(InteractionWindowButtons.OK, () => this.onButton(), InteractionWindowButtons.OK);
    }

    protected createInputFactory(): void
    {
        this._inputFactory = new InputFactory();
    }

    protected initInputs(): void
    {
        this.createInput(0, InputTypes.TEXT);
    }

    protected initButton(name: string, callback: () => void, text: string, id: string = "", className: string = ""): Button
    {
        let button: Button = this._buttons[name];
        if (!button)
        {
            button = new Button(callback, id, className);
            button.setText(text);
            this._buttons[name] = button;
        }
        
        return button;
    }

    protected createInput(idx: number, type: InputTypes, id: string = "", className: string = ""): Input
    {
        let input: Input = this._inputs[idx];
        if (!input)
        {
            input = this._inputFactory.create(idx, type, (idx: number, value: string) => this.onInputUpdate(idx, value));
            this._inputs[idx] = input;
            this._inputValues[idx] = "";

            let node: HTMLElement = input.node;
            node.id = id;
            node.className = className;
        }

        return input;
    }

    protected onInputUpdate(idx: number, value: string): void
    {
        this._inputValues[idx] = value;
        console.log("value");
    }

    protected createDiv(id: string = "", className: string = ""): HTMLDivElement
    {
        let div: HTMLDivElement = document.createElement("div");
        div.id = id;
        div.className = className;

        return  div;
    }

    public show(command: Command): void
    {
        this._headline.innerText = command.next();
        this.updateSelectionElements(command);
        this._root.appendChild(this._window);
    }
    
    protected updateSelectionElements(command: Command): void
    {
        this._selection.innerHTML = "";

        let text: string = command.next();
        while (text)
        {
            var option = document.createElement("option");
            option.text = text;
            this._selection.add(option);

            text = command.next();
        }
    }

    protected onButton(): void
    {
        this._root.removeChild(this._window);
    }
}