import { Team } from './../../../common/Enums';
import { Team } from "../../../common/Enums";

export class Board
{
    public static readonly WIDTH: number = 5;
    public static readonly HEIGHT: number = 5;
    public static readonly TEAM_FIELD_CNT: number = 9;

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
                retVal.push((this._revealed[i][j] || revealed) ? this._occupations[i][j].toString() : "-2");
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
        this.reset(Team.BLUE);
    }

    protected setAbalibleWords(err: NodeJS.ErrnoException, data: Buffer): void
    {
        // console.log(data.toString());'
        this._avalibleWords = [
            "Szürke", "Szuperhős", "Taxi", "Tábla", "Egyszarvú",
            "Egyenes", "Tűz", "Tér", "Szám", "Szakit",
            "Csomó", "Csokoládé", "Arc", "Jeti", "Csap",
            "Cirkusz", "Béka", "Beethoven", "Amazon", "Áru",
            "Banán", "Banda", "Kacsacsőrű", "Kaktusz", "Haj",
            "Hajó", "Szén", "Szemét", "Egér", "Egészség",
            "Hid", "Hét", "Köt", "Központ", "Virág",
            "Sonka", "Ordit", "Fekete", "Tök", "Tudós",
            "Bolt", "Bomba", "Volt", "Viz", "Ketchup",
            "Kéz", "Ágy", "Ajtó", "Fúj", "Föld",
            "Forrás", "Forma", "Öv", "Öl", "Berlin",
            "Baba", "Tüdő", "Tüske", "Leves", "Lézer",
            "Jár", "Jogász", "Afrika", "Adó", "Toll",
            "Tolvaj", "Loch Ness", "Lélek", "Jég", "Jegy",
            "Kulcs", "Láb", "Zár", "Zebra", "Stadion",
            "Száj", "Nővér", "Nyit", "Szikra", "Szerencse",
            "Agy", "Ág", "Fog", "Figura", "Szakasz",
            "Szakács", "Gumi", "Gitár", "Napóleon", "Narancs",
            "Sajt", "Homok", "Kemény", "Kenguru", "Alpok",
            "Arany", "Hollywood", "Hold", "Macska", "Magyar",
            "Nap", "Követ", "Piramis", "Psztoly", "Fut",
            "Fok", "Könnyű", "Korona", "Lő", "Láda",
            "Gáz", "Gazda", "Shakespeare", "Skorpió", "Orvos",
            "Oroszlán", "Kritikus", "Kréta", "Tokió", "Tojás",
            "Ausztrália", "Atom", "Koncert", "Koporsó", "Tánc",
            "Tányér", "Furulya", "Felhő", "Kalóz", "Távolság",
            "Apró", "Angyal", "Anya", "Anyag", "Sas",
            "Sor", "Labda", "Láng", "Gyűrű", "Hóember",
            "Hideg", "Haza", "Ruha", "Rulett", "Boszorkány",
            "Búvár", "Mese", "Méreg", "Üveg", "Vad",
            "Bank", "Báb", "Háború", "Hó", "Sötét",
            "Sárkány", "Kor", "Korbács", "Ügyvéd", "Ügynök",
            "Meleg", "Mentők", "Fal", "Fáklya", "Indián",
            "Iskola", "Cápa", "Cesar", "Fagylalt", "Élet",
            "Zeus", "Élet", "Körte", "Kórház", "Édes",
            "Ég", "Puska", "Pók", "Mér", "Mer",
            "Határ", "Himalája", "Bot", "Bálna", "Pingvin",
            "Pénz", "Négyzet", "Nehéz", "Fedél", "Féreg",
            "Malac", "Mexikó", "Szin", "Szinház", "Birka",
            "Biró", "Európa", "Idő", "Hajt", "Hal",
            "Idegen", "Húr", "Kereszt", "Keret", "Katona",
            "Kaszinó", "Bőr", "Benzin", "Pohár", "Pite",
            "Rózsa", "Róma", "Kártya", "Kárpátok", "Hercegnő",
            "Helikopter", "Vár", "Űr", "Gerinc", "Gyémánt",
            "Kör", "Kő", "Görög", "Gomb", "Palack",
            "Pálya", "Szaturnusz", "Szarv", "Teflon", "Tej",
            "Mű", "Manó", "Olaj", "Nyúl", "Képernyő",
            "Kerek", "Zseni", "Zöld", "Műhold", "Nadrág",
            "Lámpa", "Lép", "Árnyék", "Amerika", "Autó",
            "Azték", "Levegő", "Levél", "Kenyér", "Kentaur",
            "Óra", "Óriás", "Méz", "Milliomos", "Dél",
            "Daru", "Tévé", "Tiszta", "Dob", "Duna",
            "Hatalom", "Harang", "Kel", "Kém", "Ár",
            "Anglia", "Bánya", "Barát", "Tégla", "Tanár",
            "Fű", "Függ", "Erő", "Éjszaka", "Petőfi",
            "Pilóta", "Rák", "Radir", "Kard", "Kar",
            "Atlantisz", "Aztal", "Csavar", "Csempész", "Álom",
            "Alma", "Erdő", "Einstein", "Csizma", "Csirke",
            "Teherautó", "Szellem", "Oszlop", "Oszt", "Csöpp",
            "Cső", "Fül", "Fűszer", "Repül", "Répa",
            "Robot", "Rigó", "Nyom", "Nő", "Part",
            "Pamut", "Kút", "Királynő", "Peking", "Patkó",
            "Betegség", "Bika", "Tető", "Természet", "Dió",
            "Denevér", "Csiga", "Csillag", "Szem", "Tavasz",
            "Alak", "Alföld", "Papir", "Park", "New York",
            "Nindzsa", "Gyöngy", "Gyökér", "Majom", "Mikroszkóp",
            "Vitamin", "Vitorla", "Cérna", "Chaplin", "Kormány",
            "Kölyök", "Udvar", "Ujj", "London", "Lovag",
            "T-Rex", "Törpe", "Sivatag", "Fej", "Villa",
            "Világos", "Rendőr", "Rakéta", "Másol", "Mar",
            "Torony", "Játék", "Torta", "Opera", "Olümposz",
            "Szék", "Szél", "Kés", "Ksztyű", "Medve",
            "Mátyás", "Láz", "Lap", "Háló", "Halál",
            "Térkép", "Tű", "Lyuk", "Ló", "Hullám",
            "Vas", "Vezet", "Mező", "Moszkva", "Kocka",
            "Kutya", "Kód", "Király", "Templom", "Teleszkóp",
            "Polip", "Pont", "Csatorna", "Cipő", "Sir",
            "Sir", "Sin", "Elem", "Ejtőernyő", "Mamut",
            "Műanyag", "Szoknya", "Sziv", "Motor", "Mozi",
            "Úr", "Út", "Poláp"
        ];
    }

    public pickField(idx: number): number
    {
        const row: number = Math.floor(idx / Board.WIDTH);
        const col: number = Math.floor(idx % Board.WIDTH);

        this._revealed[row][col] = true;

        return this._occupations[row][col];
    }

    public isRevealed(idx: number): boolean
    {
        if (idx < 0)
        {
            return false;
        }
        
        const row: number = Math.floor(idx / Board.WIDTH);
        const col: number = Math.floor(idx % Board.WIDTH);

        return this._revealed[row][col];
    }

    protected resetWords(): void
    {
        this._avalibleWords = this._avalibleWords.concat(this._usedWords);
        this._usedWords = new Array<string>();
    }
    
    public reset(startingTeam: Team): void
    {
        if (this._avalibleWords.length < Board.WIDTH * Board.HEIGHT)
        {
            this.resetWords();
        }

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

        this.occupyField(Board.TEAM_FIELD_CNT - (startingTeam == Team.RED ? 0 : 1), Team.RED);
        this.occupyField(Board.TEAM_FIELD_CNT - (startingTeam == Team.BLUE ? 0 : 1), Team.BLUE);
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