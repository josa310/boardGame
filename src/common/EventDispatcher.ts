export class EventDispatcher
{
	protected _listeners: {[key: string]: Listener};

    constructor()
    {
        this._listeners = {};
    }

    public addListener(event: string, cb: (e: BaseEvent) => void): void
    {
        let listener: Listener = new Listener(cb, this._listeners[event]);
        this._listeners[event] = listener;
    }

    public dispatch(e: BaseEvent): void
    {
        let listener: Listener = this._listeners[e.type];
        while (listener)
        {
            listener = listener.call(e);
        }
    }
}
export class BaseEvent
{
    protected _type: string;
    
    public get type(): string
    {
        return this._type;
    }
    
	constructor(type: string)
	{
        this._type = type;
	}
}
class Listener
{
    protected _next: Listener;
    protected _callback: (e: BaseEvent) => void;

    constructor(callback: (e: BaseEvent) => void, next: Listener)
    {
        this._next = next;
        this._callback = callback;
    }

    public call(e: BaseEvent): Listener
    {
        this._callback(e);
        return this._next;
    }

    public getNext(): Listener
    {
        return this._next;
    }
}