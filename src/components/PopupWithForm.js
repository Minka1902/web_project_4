import { Input } from "postcss";
import Popup from "./Popup"

export default class PopupWithForm extends Popup {
    constructor(classSelector, submit) {
        super(classSelector);
        this._submit = submit;
        this._form = this._element.querySelector(".popup__form")
        this._inputs = this._element.querySelectorAll(".popup__input");
        this._button = this._element.querySelector(".popup__button");
    }

    getInputValues() {
        const formValues = {};
        for (let i = 0; i < this._inputs.length; i++) {
            formValues[this._inputs[i].name] = this._inputs[i].value;
        }

        return formValues;
    }

    close() {
        this._form.reset();
        super.close();
    }

    setEventListeners() {
        super.setEventListeners();

        this._form.addEventListener("submit", (evt) => {
            this._button.textContent = "Saving...";
            this._submit(evt);
        });
    }
}