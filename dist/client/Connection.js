define(["require", "exports", "./../common/Command", "../common/event/EventDispatcher", "./event/CommandEvent"], function (require, exports, Command_1, EventDispatcher_1, CommandEvent_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Connection extends EventDispatcher_1.EventDispatcher {
        constructor(address) {
            super();
            this._address = address;
            this._command = new Command_1.Command();
            this._commandEvent = new CommandEvent_1.CommandEvent();
            this._commandEvent.command = this._command;
            this.establishConnection();
        }
        establishConnection() {
            this._connection = new WebSocket(this._address);
            this._connection.onopen = () => this.onOpen();
            this._connection.onerror = (e) => this.onError(e);
            this._connection.onmessage = (e) => this.onMessage(e);
        }
        onOpen() {
            console.log("Connection established.");
        }
        onError(e) {
            console.log("Some error happened.", e);
        }
        onMessage(event) {
            this._command.processData(event.data);
            this.dispatch(this._commandEvent);
        }
        send(data) {
            this._connection.send(data);
        }
    }
    exports.Connection = Connection;
});
//# sourceMappingURL=Connection.js.map