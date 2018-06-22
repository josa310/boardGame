define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Game {
        set isActive(value) {
            this._isActive = value;
        }
        get name() {
            return this._name;
        }
        get id() {
            return this._id;
        }
        get players() {
            return this._players;
        }
        constructor(name, id) {
            this._id = id;
            this._name = name;
            this._isActive = true;
            this._players = new Array();
        }
        setAvalibleRoles() {
        }
        addPlayer(player) {
            this._players.push(player);
            return true;
        }
        removePlayer(player) {
            let idx = this.players.indexOf(player);
            if (idx > -1) {
                this._players.splice(idx, 1);
            }
            return true;
        }
        get avalibleRoles() {
            return this._avalibleRoles;
        }
        notifyPlayers() {
        }
    }
    exports.Game = Game;
});
//# sourceMappingURL=Game.js.map