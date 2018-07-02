export abstract class Input
{
    protected _idx: number;
    protected _node: HTMLInputElement;
    protected _callback: (idx: number, value: string) => void;

    public get node(): HTMLElement 
    {
        return this._node;
    }

    public get value(): string 
    {
        return this._node.value;
    }

    public set value(value: string) 
    {
        this._node.value = value;
    }

    constructor(idx: number, onChange: (idx: number, value: string) => void) 
    {
        this._idx = idx;
        this._callback = onChange;
        
        this.init();
    }
    
    protected onChange(): void
    {
        this._callback(this._idx, this._node.value);
    }
    
    protected init(): void
    {
        this.createNode();
        this._node.onchange = () => this.onChange();
    }
    
    protected abstract createNode(): void;
    public abstract setData(data: string[]): void;
}
