import { Listener } from "./Listener";
import { BaseEvent } from "./BaseEvent";

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