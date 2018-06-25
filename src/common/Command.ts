export enum Command
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
    SEPARATOR = "☺"
}

export class CommandCreator
{
    static create(datas: any[]): string
    {
        let retVal: string = "";
        for (let data in datas)
        {
            retVal += data + Command.SEPARATOR;
        }

        return retVal;
    }
}
