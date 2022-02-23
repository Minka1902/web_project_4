export default class Popup {
    constructor(popupSelector) {
        this._isOpen = false;
        this._element = document.querySelector(popupSelector);
        this.setEventListeners();
    }

    getElement() {
        return this._element;
    }

    open() {
        this._isOpen = true;
        this._element.classList.add("popup_opened");
    }

    close() {
        this._isOpen = false;
        // check if this is popup (or close-button clicked) 
        if (this._element) {
            this._element.classList.remove("popup_opened");
        } else {
            // get the popup parent
            this.parentElement.parentElement.classList.remove("popup_opened");
        }
        document.removeEventListener("keydown", this._handleEscClose);
    }

    contains(className) {
        if (this._element.classList.contains(className)) {
            return true;
        }
        return false;
    }

    querySelector(className) {
        return this._element.querySelector(className);
    }

    _handleEscClose(evt) {
        if (evt.code == "Escape") {
            this.close();
        }
    }

    setEventListeners() {
        document.addEventListener("keydown", (evt) => { this._handleEscClose(evt) });
        this._element.querySelector(".popup__close-button").addEventListener("click", this.close);
        document.addEventListener("keydown", (evt) => {
            this._handleEscClose(evt);
        });
    }
}