import Popup from "./Popup";

export default class PopupConfirm extends Popup {
    constructor(popupSelector, buttonSelector) {
        super(popupSelector);
        this._button = this._element.querySelector(buttonSelector);
        this._isOpen = false;
    }

    open(handleClick, api) {
        super.open();
        this._api = api;
        this._handleClick = handleClick;
        this._button.addEventListener("click", () => { this._handleClick(this._api) });
    }

    close() {
        super.close();
        this._button.removeEventListener("click", () => { this._handleClick(this._api) });
    }
}