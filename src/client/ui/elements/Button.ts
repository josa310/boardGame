export class Button
{
    protected _node: HTMLButtonElement;

    public get node(): HTMLButtonElement
    {
        return this._node;
    }

    constructor(callback: () => void, id: string = "", className: string = "")
    {
        this._node = document.createElement("button");
        
        this._node.id = id;
        this._node.onclick = callback;
        this._node.className = className;
    }

    public enable(value: boolean): void
    {
        this._node.disabled = !value;
    }

    public setText(text: string): void
    {
        this._node.innerText = text;
    }
}