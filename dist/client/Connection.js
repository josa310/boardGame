define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Connection {
        constructor(address) {
            this._address = address;
            this.establishConnection();
        }
        establishConnection() {
            this._connection = new WebSocket(this._address);
            this._connection.onopen = () => this.onOpen();
            this._connection.onerror = (e) => this.onError(e);
            this._connection.onmessage = (e) => this.onMessage(e);
            this._listeners = new Array();
        }
        onOpen() {
            console.log("Connection established.");
        }
        onError(e) {
            console.log("Some error happened.", e);
        }
        onMessage(message) {
            this.dispatch(message.data);
        }
        send(data) {
            this._connection.send(data);
        }
        addListener(listener) {
            this._listeners.push(listener);
        }
        dispatch(data) {
            for (let listener of this._listeners) {
                listener(data);
            }
        }
    }
    exports.Connection = Connection;
});
//# sourceMappingURL=Connection.js.map