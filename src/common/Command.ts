export enum Commands
{
    WAIT,
    GAME_DATA,
    MESESSAGE,
    GAME_MESSAGE,
    SERVER_MESSAGE,
    START_NEW_GAME,
    GAME_OVER,
    PLAYER_LEFT,
    PLAYER_JOINED,
    SELECT_ROLE,
    SET_ROLE,
    JOIN_GAME,
    INIT_GAME,
    RESTART_GAME,
    GAME_LIST,
    UI_MESSAGE,
    SEPARATOR = "☺"
}

export class Command
{
    protected _data: string[];
    protected _dataIdx: number;
    protected _numData: number;

    constructor()
    {
        this._dataIdx = 0;
        this._numData = 0;
        this._data = new Array<string>();
    }

    public processData(data: string): void
    {
        this._data = data.split(Commands.SEPARATOR);
        this._dataIdx = 0;
        this._numData = data.length;
    }

    public next(): string
    {
        if (this._dataIdx < this._numData)
        {
            return this._data[this._dataIdx++];
        }

        return null;
    }

    public nextInt(): number
    {
        return parseInt(this.next());
    }

    public clear(): void
    {
        this._data = new Array<string>();
        this._dataIdx = 0;
        this._numData = 0;
    }

    public push(data: any): Command
    {
        this._data.push(data.toString());
        this._numData = this._data.length;
        return this;
    }

    public toString(): string
    {
        let retVal: string = "";
        for (let data of this._data)
        {
            retVal += (data + Commands.SEPARATOR);
        }

        return retVal;
    }
}