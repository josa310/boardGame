import { Input } from "../elements/Input";
import { Button } from "../elements/Button";
import { Command } from "../../../common/Command";
import { EventDispatcher } from "../../../common/event/EventDispatcher";
import { InputFactory, InputTypes } from "../elements/InputFactory";

export enum InteractionWindowButtons
{
    OK = "OK",
    CANCEL = "Cancel",
    EXIT = "Exit",
    SEND = "Send"
}

export class InteractionWindow extends EventDispatcher
{
    protected _root: HTMLElement;
    protected _window: HTMLDivElement;
    protected _inputFactory: InputFactory;
    
    protected _inputs: {[key: number]: Input};
    protected _buttons: {[key: string]: Button};
    protected _inputValues: {[key: number]: string};

    constructor(root: HTMLElement)
    {
        super();
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
    }

    protected initButtons(): void
    {
    }

    protected createInputFactory(): void
    {
        this._inputFactory = new InputFactory();
    }

    protected initInputs(): void
    {
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
        this._root.appendChild(this._window);
    }

    public hide(): void
    {
        this._root.removeChild(this._window);
    }
}