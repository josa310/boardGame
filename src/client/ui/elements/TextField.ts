import { Input } from "./Input";

export class TextField extends Input
{
    protected createNode(): void 
    {
        this._node = document.createElement("input");
        this._node.onchange = () => this.onChange();
        this._node.type = "text";
    }    
    
    public setData(data: string[]): void 
    {
        this._node.value = data[0];
    }
}