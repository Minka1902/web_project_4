export default class FormValidator {
    constructor(settings, formToValidate) {
        this._form = formToValidate;
        this._setSettings(settings);
    }

    _setSettings(settings) {
        this._formSelector = settings.formSelector;
        this._inputSelector = settings.inputSelector;
        this._submitButtonSelector = settings.submitButtonSelector;
        this._inactiveButtonClass = settings.inactiveButtonClass;
        this._inputErrorClass = settings.inputErrorClass;
        this._errorClass = settings.errorClass;
    }

    enableValidation() {
        if (this._formSelector) {
            this._form.addEventListener("submit", (e) => e.preventDefault());
            const inputs = [...this._form.querySelectorAll(this._inputSelector)];
            inputs.forEach((inputElement) => {
                inputElement.addEventListener("input", (evt) => {
                    this._handleInputEvent(evt.target, this._inputErrorClass, this._errorClass);
                    this._buttonValidator();
                });
            });
        }
    }

    // ! this function handles the error massage state according to the input validity
    _handleInputEvent(inputElement) {
        const errorMessage = inputElement.parentElement.querySelector(`.${inputElement.id}-error`);

        if (this._checkInputValidity(inputElement)) {
            this._hideErrorMessage(errorMessage, this._errorClass);
            inputElement.classList.remove(this._inputErrorClass);
        } else {
            this._showErrorMessage(errorMessage, this._errorClass);
            inputElement.classList.add(this._inputErrorClass);
        }
    }

    // ! this function checkes if the form is valid
    _checkFormValidity(formElement) {
            const inputList = [...formElement.querySelectorAll(this._inputSelector)];
            let isValid = true;
            for (let i = 0; i < inputList.length; i++) {
                if (!this._checkInputValidity(inputList[i])) {
                    isValid = false;
                }
            }
            return isValid;
        }
        // ! this function hides the error massage
    _hideErrorMessage(errorMessage) {
        errorMessage.classList.remove(this._errorClass);
    }

    // ! this function shows the error massage
    _showErrorMessage(errorMessage) {
        errorMessage.classList.add(this._errorClass);
    }

    // ! this function handles the button state according to the form validity
    _buttonValidator() {
        const formButton = this._form.querySelector(this._submitButtonSelector);
        if (this._checkFormValidity(this._form, this._inputSelector)) {
            this.toggleButtonState(formButton, true);
        } else {
            this.toggleButtonState(formButton, false);
        }
    }

    // ! this function checkes if the input is valid
    _checkInputValidity(inputElement) {
        return inputElement.validity.valid;
    }

    // ! this function toggles button state
    toggleButtonState(button, isValid) {
        if (isValid) {
            button.classList.remove(this._inactiveButtonClass);
            button.disabled = false;
        } else {
            button.classList.add(this._inactiveButtonClass);
            button.disabled = true;
        }
    }
}