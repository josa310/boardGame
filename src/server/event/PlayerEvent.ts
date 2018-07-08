import { IMessage } from 'websocket';
import { BaseEvent } from '../../common/event/BaseEvent';

export class PlayerEvent extends BaseEvent
{
    public static readonly MESSAGE: string = "MESSAGE";
    public static readonly CONNECT: string = "CONNECTED";
    public static readonly RECONNECT: string = "RECONNECTED";
    public static readonly DISCONNECT: string = "DISCONNECTED";

    protected _idx: number
    protected _message: IMessage;

    public get idx(): number
    {
        return this._idx;
    }

    public set idx(value: number)
    {
        this._idx = value;
    }

    public get message(): IMessage
    {
        return this._message;
    }

    public set message(value: IMessage)
    {
        this._message = value;
    }

    constructor(type: string, idx: number = -1)
    {
        super(type);
        this._idx = idx;
    }
}