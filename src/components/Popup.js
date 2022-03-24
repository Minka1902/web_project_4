export default class Popup {
    constructor(popupSelector) {
        this._isOpen = false;
        this._element = document.querySelector(popupSelector);
    }

    open() {
        this._isOpen = true;
        document.addEventListener("keydown", this._handleEscClose);
        this._element.classList.add("popup_opened");
    }

    close() {
        this._isOpen = false;
        if (this._element) {
            this._element.classList.remove("popup_opened");
        }
        document.removeEventListener("keydown", this._handleEscClose);
    }

    querySelector(className) {
        return this._element.querySelector(className);
    }

    _handleEscClose = (evt) => {
        if (evt.code == "Escape") {
            this.close();
        }
    }

    checkIfOpened() {
        return this._isOpen;
    }

    setEventListeners() {
        this._element.querySelector(".popup__close-button").addEventListener("click", (evt) => {
            this.close();
        });

        this._element.addEventListener("mousedown", (evt) => {
            if (evt.target.classList.contains("popup_opened")) {
                this.close();
            }
        });
    }
}