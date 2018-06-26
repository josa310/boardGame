import { Command } from "../../../common/Command";

export class InteractionWindow
{
    protected _root: HTMLElement;
    protected _window: HTMLDivElement;
    protected _headline: HTMLDivElement;
    protected _button: HTMLButtonElement;
    protected _selection: HTMLSelectElement;

    constructor(root: HTMLElement)
    {
        this._root = root;

        this.createElements();        
    }

    protected createElements(): void
    {
        this._window = this.createDiv("interactionWindow");
        this._headline = this.createDiv("headline");
        this._selection = document.createElement("select");
        this._button = document.createElement("button");

        this._button.innerText = "OK";
        this._button.onclick = () => this.onButton();

        this._window.appendChild(this._headline);
        this._window.appendChild(this._selection);
        this._window.appendChild(this._button);
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