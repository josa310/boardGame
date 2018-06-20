import { Connection } from "./Connection";

export class InteractionWindow
{
    protected _root: HTMLElement;
    protected _window: HTMLDivElement;
    protected _headline: HTMLDivElement;
    protected _selection: HTMLSelectElement;
    protected _button: HTMLButtonElement;
    protected _connection: Connection;

    constructor(connection: Connection, root: HTMLElement)
    {
        this._connection = connection;
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

    public show(headline: string, options: string[]): void
    {
        this._headline.innerText = headline;
        this.updateSelectionElements(options);
        this._root.appendChild(this._window);
    }
    
    protected updateSelectionElements(elements: string[]): void
    {
        this._selection.innerHTML = "";
        for (let element of elements)
        {
            var option = document.createElement("option");
            option.text = element;
            this._selection.add(option);
        }
    }

    protected onButton(): void
    {
        this._root.removeChild(this._window);
        this._connection.send(this._selection.options[this._selection.selectedIndex].value);
    }
}