import { Game } from "./Game";
import { Command } from "../../common/Command";
import { GameTypes } from "../../common/GameTypes";
import { CodeNames } from "./games/CodeNames";
import { CommandHandler } from "../CommandHandler";

export class GameFactory
{
    protected _commandHandler: CommandHandler;

    constructor(commandHandler: CommandHandler)
    {
        this._commandHandler = commandHandler;
    }

    public createGame(command: Command): Game
    {
        const type: GameTypes = <GameTypes>command.next();
        const id: string = command.next();
        const name: string = command.next();

        switch (type)
        {
            case GameTypes.DEFAULT:
                return null;
            
            case GameTypes.CODE_NAMES:
                return new CodeNames(id, name, this._commandHandler);
        }
    }
}