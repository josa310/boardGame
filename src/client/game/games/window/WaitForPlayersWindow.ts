import { InteractionWindow } from "../../../ui/window/InteractionWindow";

export class WaitForPlayersWindow extends InteractionWindow
{
    protected createElements(): void
    {
        super.createElements();

        let messageWindow: HTMLElement = document.createElement("div");
        messageWindow.innerText = "Wait for other players to join";

        this._window.appendChild(messageWindow);
    }
}