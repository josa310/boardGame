define(["require", "exports", "./../common/EventDispatcher", "./event/PlayerEvent"], function (require, exports, EventDispatcher_1, PlayerEvent_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var PlayerRole;
    (function (PlayerRole) {
        PlayerRole["PLAYER"] = "Player";
        PlayerRole["MASTER"] = "Master";
        PlayerRole["OBSERVER"] = "Observer";
    })(PlayerRole = exports.PlayerRole || (exports.PlayerRole = {}));
    var Team;
    (function (Team) {
        Team["RED"] = "Red";
        Team["BLUE"] = "Blue";
        Team["GEEN"] = "Green";
    })(Team = exports.Team || (exports.Team = {}));
    class Player extends EventDispatcher_1.EventDispatcher {
        constructor(connection) {
            super();
            this._idx = Player.idx++;
            this._connection = connection;
            this.reset();
            this.createEvents();
            this.setupEventListeners();
        }
        set role(value) {
            this._role = value;
        }
        set team(value) {
            this._team = value;
        }
        set game(value) {
            this._game = value;
        }
        get role() {
            return this._role;
        }
        get team() {
            return this._team;
        }
        get game() {
            return this._game;
        }
        get idx() {
            return this._idx;
        }
        setupEventListeners() {
            this._connection.on("message", (e) => this.onMessage(e));
            this._connection.on("close", () => this.onDisconnect());
        }
        createEvents() {
            this._messageEvent = new PlayerEvent_1.PlayerEvent(PlayerEvent_1.PlayerEvent.MESSAGE, this._idx);
            this._disconnectEvent = new PlayerEvent_1.PlayerEvent(PlayerEvent_1.PlayerEvent.DISCONNECT, this._idx);
        }
        reset() {
            this._game = null;
            this._role = null;
            this._team = null;
            this._isPlaying = false;
        }
        send(data) {
            this._connection.sendUTF(data);
        }
        onDisconnect() {
            this.dispatch(this._disconnectEvent);
        }
        onMessage(message) {
            this._messageEvent.message = message;
            this.dispatch(this._messageEvent);
        }
    }
    Player.idx = 0;
    exports.Player = Player;
});
//# sourceMappingURL=Player.js.map