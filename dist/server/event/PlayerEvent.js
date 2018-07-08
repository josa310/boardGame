define(["require", "exports", "../../common/event/BaseEvent"], function (require, exports, BaseEvent_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class PlayerEvent extends BaseEvent_1.BaseEvent {
        constructor(type, idx = -1) {
            super(type);
            this._idx = idx;
        }
        get idx() {
            return this._idx;
        }
        set idx(value) {
            this._idx = value;
        }
        get message() {
            return this._message;
        }
        set message(value) {
            this._message = value;
        }
    }
    PlayerEvent.MESSAGE = "MESSAGE";
    PlayerEvent.CONNECT = "CONNECTED";
    PlayerEvent.RECONNECT = "RECONNECTED";
    PlayerEvent.DISCONNECT = "DISCONNECTED";
    exports.PlayerEvent = PlayerEvent;
});
//# sourceMappingURL=PlayerEvent.js.map