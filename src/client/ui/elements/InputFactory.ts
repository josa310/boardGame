import { Input } from "./Input";
import { TextField } from "./TextField";
import { Selection } from "./Selection";

export enum InputTypes
{
    TEXT,
    SELECTION,
    CHECKBOX,
    RADIO
}


export class InputFactory
{
    public create(idx: number, type: number, callback: (idx: number, value: string) => void): Input
    {
        switch (type)
        {
            case InputTypes.TEXT:
                return new TextField(idx, callback);

            case InputTypes.SELECTION:
                return new Selection(idx, callback);
                
            default: 
                return null;
        }
    }
}