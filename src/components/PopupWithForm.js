import Popup from "./Popup"

export default class PopupWithForm extends Popup {
    constructor(classSelector, submit) {
        super(classSelector);
        this._submit = submit;
        this._form = this._element.querySelector(".popup__form")
    }

    _getInputValues() {
        const formValues = {};
        const inputs = this._element.querySelectorAll(".popup__input");
        for (let i = 0; i < inputs.length; i++) {
            formValues[input.name] = input.value;
        }
        return formValues;
    }

    setEventListeners() {
        super.setEventListeners();

        this._form.addEventListener("submit", (evt) => {
            this._submit(evt);
        });
    }
}