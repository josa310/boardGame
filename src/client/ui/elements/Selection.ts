import { Input } from "./Input";

export class Selection extends Input
{
    protected _node: HTMLSelectElement;

    public get value(): string 
    {
        return this._node.value;
    }

    public set value(value: string) 
    {
        this._node.value = value;
    }

    public enable(enable: boolean): void
    {
        this._node.disabled = !enable;
    }

    protected createNode(): void 
    {
        this._node = document.createElement("select");
        this._node.onchange = () => this.onChange();
    }   
    
    protected onChange(): void
    {
        this._callback(this._idx, this._node.value);
    }
    
    public setData(data: string[]): void 
    {
        this._node.innerHTML = "";

        for (let text of data)
        {
            var option = document.createElement("option");
            option.text = text;
            this._node.add(option);
        }
    }

    public setDataWithValues(data: string[], values: string[]): void
    {
        this.setData(data);

        let idx: number = 0;
        for (let option of this._node.options)
        {
            option.value = values[idx++];
        }
    }
}