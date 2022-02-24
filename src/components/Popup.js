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
        document.addEventListener("keydown", this._handleEscClose);
        this._element.classList.add("popup_opened");
    }

    close = () => {
        this._isOpen = false;
        this._element.classList.remove("popup_opened");
        document.removeEventListener("keydown", this._handleEscClose);
    }

    classContains(className) {
        if (this._element.classList.contains(className)) {
            return true;
        }
        return false;
    }

    querySelector(className) {
        return this._element.querySelector(className);
    }

    _handleEscClose = () => {
        if (evt.code == "Escape") {
            this.close();
        }
    }

    setEventListeners = () => {
        this._element.querySelector(".popup__close-button").addEventListener("click", this.close);

        this._element.addEventListener("mousedown", function(evt) {
            if (evt.target.classList.contains("popup_opened")) {
                this.classList.remove("popup_opened");
            }
        });
    }
}