define(["require", "exports", "./../../common/EventDispatcher"], function (require, exports, EventDispatcher_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class PlayerEvent extends EventDispatcher_1.BaseEvent {
        constructor(type, idx) {
            super(type);
            this._idx = idx;
        }
        get idx() {
            return this._idx;
        }
        get message() {
            return this._message;
        }
        set message(value) {
            this._message = value;
        }
    }
    PlayerEvent.MESSAGE = "MESSAGE";
    PlayerEvent.RECONNECT = "RECONNECTED";
    PlayerEvent.DISCONNECT = "DISCONNECTED";
    exports.PlayerEvent = PlayerEvent;
});
//# sourceMappingURL=PlayerEvent.js.map