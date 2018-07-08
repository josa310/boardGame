export class BaseEvent
{
    protected _type: string;
    
    public get type(): string
    {
        return this._type;
    }

    public set type(value: string)
    {
        this._type = value;
    }
    
	constructor(type: string)
	{
        this._type = type;
	}
}