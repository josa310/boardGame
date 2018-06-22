define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class EventDispatcher {
        constructor() {
            this._listeners = {};
        }
        addListener(event, cb) {
            let listener = new Listener(cb, this._listeners[event]);
            this._listeners[event] = listener;
        }
        dispatch(e) {
            let listener = this._listeners[e.type];
            while (listener) {
                listener = listener.call(e);
            }
        }
    }
    exports.EventDispatcher = EventDispatcher;
    class BaseEvent {
        get type() {
            return this._type;
        }
        constructor(type) {
            this._type = type;
        }
    }
    exports.BaseEvent = BaseEvent;
    class Listener {
        constructor(callback, next) {
            this._next = next;
            this._callback = callback;
        }
        call(e) {
            this._callback(e);
            return this._next;
        }
        getNext() {
            return this._next;
        }
    }
});
//# sourceMappingURL=EventDispatcher.js.map