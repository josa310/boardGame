define(["require", "exports", "./ui/InteractionWindow", "./Connection"], function (require, exports, InteractionWindow_1, Connection_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Game {
        constructor(address = "ws://127.0.0.1:1337") {
            this._connection = new Connection_1.Connection(address);
            this._connection.addListener((data) => this.onData(data));
            this._commWindow = new InteractionWindow_1.InteractionWindow(this._connection, document.body);
        }
        onData(data) {
            let commands = data.split(",");
            let idx = 0;
            switch (commands[idx++]) {
                case "roleWindow":
                    let headLine = commands[idx++];
                    let options = commands.slice(idx, commands.length);
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
    exports.Game = Game;
});
//# sourceMappingURL=Game.js.map