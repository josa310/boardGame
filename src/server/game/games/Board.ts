import fs = require("fs");
import { Team, PlayerRole } from "../../../common/Enums";

export class Board
{
    public static readonly WIDTH: number = 5;
    public static readonly HEIGHT: number = 5;

    protected _words: string[][];
    protected _occupations: number[][];
    protected _revealed: boolean[][];
    protected _avalibleWords: string[];
    protected _usedWords: string[];

    public get words(): string[][]
    {
        return this._words;
    }

    public get occupations(): number[][]
    {
        return this._occupations;
    }

    public get revealed(): boolean[][]
    {
        return this._revealed;
    }

    public getBoard(revealed: boolean): string[]
    {
        let retVal: string []= new Array<string>();

        for (let i: number = 0; i < Board.WIDTH; i++)
        {
            for (let j: number = 0; j < Board.HEIGHT; j++)
            {
                retVal.push(this._words[i][j]);
                retVal.push((this._revealed[i][i] || revealed) ? this._occupations[i][j].toString() : Team.NEUTRAL.toString());
            }
        }

        return retVal;
    }

    constructor()
    {
        this._avalibleWords = new Array<string>();
        this._usedWords = new Array<string>();

        // fs.readFile( '/words.txt', (e: NodeJS.ErrnoException, data: Buffer) => this.setAbalibleWords(e, data));

        this.setAbalibleWords(null, null);
        this.reset();
    }

    protected setAbalibleWords(err: NodeJS.ErrnoException, data: Buffer): void
    {
        // console.log(data.toString());'
        this._avalibleWords = ["asdh", "tytyu", "bnmc", "iopsad", "uytasd",
            "asdh", "tytyu", "bnmc", "iopsad", "uytasd",
            "asdh", "tytyu", "bnmc", "iopsad", "uytasd",
            "asdh", "tytyu", "bnmc", "iopsad", "uytasd",
            "asdh", "tytyu", "bnmc", "iopsad", "uytasd",
            "asdh", "tytyu", "bnmc", "iopsad", "uytasd",
            "asdh", "tytyu", "bnmc", "iopsad", "uytasd",
            "asdh", "tytyu", "bnmc", "iopsad", "uytasd",
            "asdh", "tytyu", "bnmc", "iopsad", "uytasd",
            "asdh", "tytyu", "bnmc", "iopsad", "uytasd",
            "asdh", "tytyu", "bnmc", "iopsad", "uytasd",
            "asdh", "tytyu", "bnmc", "iopsad", "uytasd",
            "asdh", "tytyu", "bnmc", "iopsad", "uytasd",
            "asdh", "tytyu", "bnmc", "iopsad", "uytasd",
            "asdh", "tytyu", "bnmc", "iopsad", "uytasd"];
    }

    public pickField(idx: number): number
    {
        const row: number = Math.floor(idx / Board.WIDTH);
        const col: number = Math.floor(idx % Board.WIDTH);

        this._revealed[row][col] = true;

        return this._occupations[row][col];
    }

    protected resetWords(): void
    {
        this._avalibleWords = this._avalibleWords.concat(this._usedWords);
        this._usedWords = new Array<string>();
    }
    
    public reset(): void
    {
        this._words = new Array<Array<string>>(Board.WIDTH);
        this._occupations = new Array<Array<number>>(Board.WIDTH);
        this._revealed = new Array<Array<boolean>>(Board.WIDTH);

        for (let i: number = 0; i < Board.WIDTH; i++)
        {
            this._words[i] = new Array<string>(Board.HEIGHT);
            this._occupations[i] = new Array<number>(Board.HEIGHT);
            this._revealed[i] = new Array<boolean>(Board.HEIGHT);

            for (let j: number = 0; j < Board.HEIGHT; j++)
            {
                this._words[i][j] = this.getRandomWord();
                this._occupations[i][j] = Team.NEUTRAL;
                this._revealed[i][j] = false;
            }   
        }        

        this.occupyField(5, Team.RED);
        this.occupyField(5, Team.BLUE);
        this.occupyField(1, -1);
    }

    protected occupyField(cnt: number, team: number): void
    {
        if (team == Team.NEUTRAL)
        {
            return;
        }

        while (cnt > 0)
        {
            let row: number = Math.round(Math.random() * (Board.WIDTH - 1));
            let col: number = Math.round(Math.random() * (Board.HEIGHT - 1));

            if (this._occupations[row][col] == Team.NEUTRAL)
            {
                this._occupations[row][col] = team;
                cnt--;
            }
        }
    }

    protected getRandomWord(): string
    {
        const idx: number = Math.round(Math.random() * (this._avalibleWords.length - 1));

        const word: string = this._avalibleWords.splice(idx, 1)[0];
        this._usedWords.push(word);

        return word;
    }
}