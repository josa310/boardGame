import { InteractionWindow } from './ui/InteractionWindow';
import { Connection } from "./Connection";


export class Game 
{
    protected _connection: Connection;
    protected _commWindow: InteractionWindow;

    constructor(address: string = "ws://127.0.0.1:1337")
    {
        this._connection = new Connection(address);
        this._connection.addListener((data: string) => this.onData(data));

        this._commWindow = new InteractionWindow(this._connection ,document.body);
    }

    protected onData(data: string): void
    {
        let commands: string[] = data.split(",");
        let idx: number = 0;

        switch (commands[idx++])
        {
            case "roleWindow": 
                let headLine: string = commands[idx++];
                let options: string[] = commands.slice(idx, commands.length);
                this._commWindow.show(headLine, options);
                break;

            case "teamWindow":
                break;
            
            default:
                break;
        }

        console.log(data);
    }
}