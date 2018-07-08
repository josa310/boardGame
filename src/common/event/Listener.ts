import { BaseEvent } from "./BaseEvent";

export class Listener
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