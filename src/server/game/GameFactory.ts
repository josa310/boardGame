import { Game } from './Game';
import { GameTypes } from './../../common/GameTypes';
import { CodeNames } from './games/CodeNames';

export class GameFactory
{
    public createGame(type: GameTypes, name: string, id: number): Game
    {
        switch (type)
        {
            case GameTypes.CODE_NAMES:
                return new CodeNames(name, id);
                
            default:
                return null;
        }
    }
}