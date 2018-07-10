import { Input } from "./Input";

export class TextField extends Input
{
    protected _node: HTMLInputElement;
    
    public get value(): string 
    {
        return this._node.value;
    }

    public set value(value: string) 
    {
        this._node.value = value;
    }

    protected createNode(): void 
    {
        this._node = document.createElement("input");
        this._node.classList.add("inputField");
        this._node.onchange = () => this.onChange();
        this._node.type = "text";
    }  
    
    public enable(enable: boolean): void
    {
        this._node.disabled = !enable;
    }
    
    protected onChange(): void
    {
        this._callback(this._idx, this._node.value);
    }
    
    public setData(data: string[]): void 
    {
        this._node.value = data[0];
    }
}