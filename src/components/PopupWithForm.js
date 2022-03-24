import Popup from "./Popup"

export default class PopupWithForm extends Popup {
    constructor(classSelector, submit) {
        super(classSelector);
        this._submit = submit;
        this._form = this._element.querySelector(".popup__form")
        this._inputs = this._element.querySelectorAll(".popup__input");
        this._button = this._element.querySelector(".popup__button");
    }

    close(isAdded) {
        super.close();
        if (!isAdded) {
            this._form.reset();
        }
    }

    setEventListeners() {
        super.setEventListeners();

        this._form.addEventListener("submit", (evt) => {
            this._button.textContent = "Saving...";
            this._submit(evt);
        });
    }
}