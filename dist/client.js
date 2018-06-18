var Client = /** @class */ (function () {
    function Client(address) {
        this._address = address;
        this.establishConnection();
    }
    Client.prototype.establishConnection = function () {
        var _this = this;
        this._connection = new WebSocket(this._address);
        this._connection.onopen = function () { return _this.onOpen(); };
        this._connection.onerror = function (e) { return _this.onError(e); };
        this._connection.onmessage = function (e) { return _this.onMessage(e); };
    };
    Client.prototype.onOpen = function () {
        console.log("Connection established.");
    };
    Client.prototype.onError = function (e) {
        console.log("Some error happened.", e);
    };
    Client.prototype.onMessage = function (message) {
        console.log(message.data);
    };
    return Client;
}());
//# sourceMappingURL=client.js.map