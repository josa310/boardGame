define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class InteractionWindow {
        constructor(connection, root) {
            this._connection = connection;
            this._root = root;
            this.createElements();
        }
        createElements() {
            this._window = this.createDiv("interactionWindow");
            this._headline = this.createDiv("headline");
            this._selection = document.createElement("select");
            this._button = document.createElement("button");
            this._button.innerText = "OK";
            this._button.onclick = () => this.onButton();
            this._window.appendChild(this._headline);
            this._window.appendChild(this._selection);
            this._window.appendChild(this._button);
        }
        createDiv(id = "", className = "") {
            let div = document.createElement("div");
            div.id = id;
            div.className = className;
            return div;
        }
        show(headline, options) {
            this._headline.innerText = headline;
            this.updateSelectionElements(options);
            this._root.appendChild(this._window);
        }
        updateSelectionElements(elements) {
            this._selection.innerHTML = "";
            for (let element of elements) {
                var option = document.createElement("option");
                option.text = element;
                this._selection.add(option);
            }
        }
        onButton() {
            this._root.removeChild(this._window);
            this._connection.send(this._selection.options[this._selection.selectedIndex].value);
        }
    }
    exports.InteractionWindow = InteractionWindow;
});
//# sourceMappingURL=InteractionWindow.js.map