export abstract class Input
{
    protected _idx: number;
    protected _node: HTMLElement;
    protected _callback: (idx: number, value: string) => void;

    public get node(): HTMLElement 
    {
        return this._node;
    }

    public abstract get value(): string;
    public abstract set value(value: string);

    constructor(idx: number, onChange: (idx: number, value: string) => void) 
    {
        this._idx = idx;
        this._callback = onChange;
        
        this.init();
    }
    
    protected abstract onChange(): void;
    protected abstract enable(enable: boolean): void;
    
    protected init(): void
    {
        this.createNode();
        this._node.onchange = () => this.onChange();
    }
    
    protected abstract createNode(): void;
    public abstract setData(data: string[]): void;
}
