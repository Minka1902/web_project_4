import Popup from "./Popup"

export default class PopupWithForm extends Popup {
    constructor(classSelector, submit) {
        super(classSelector);
        this._submit = submit;
    }

    _getInputValues() {
        const object = {};
        const inputs = this._element.querySelectorAll(".popup__input");
        for (let i = 0; i < inputs.length; i++) {
            object[`input ${i}`] = inputs[i].content;
        }
        return object;
    }

    close() {
        super.close();
        if (this._element.classList.contains("popup_add")) {
            this._form.reset();
        }
    }

    setEventListeners() {
        document.addEventListener("keydown", (evt) => {
            this._handleEscClose(evt);
        });

        this._element.querySelector(".popup__close-button").addEventListener("click", close);

        this._form = this._element.querySelector(".popup__form");
        this._form.addEventListener("submit", (evt) => { this._submit(evt); });
    }
}