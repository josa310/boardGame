export enum Commands
{
    MESESSAGE,
    GAME_MESSAGE,
    SERVER_MESSAGE,
    START_NEW_GAME,
    END_GAME,
    PLAYER_LEFT,
    PLAYER_JOINED,
    GAME_RESET,
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

    public clear(): void
    {
        this._data = new Array<string>();
    }

    public push(data: any): Command
    {
        this._data.push(data.toString());

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