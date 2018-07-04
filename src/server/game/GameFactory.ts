import { Game } from './Game';
import { GameTypes } from './../../common/GameTypes';

export class GameFactory
{
    public createGame(type: GameTypes, name: string, id: number): Game
    {
        switch (type)
        {
            default:
                return new Game(name, id);
        }
    }
}