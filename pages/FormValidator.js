export class FormValidator {
    constructor(settings, formToValidate) {
        this._form = formToValidate;
        this._getSettings(settings);
    }

    _getSettings(settings) {
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
                    this._handleForm(this._submitButtonSelector, this._inactiveButtonClass, this._inputSelector);
                });
            });
        }
    }

    // ! this function handles the error massage state according to the input validity
    _handleInputEvent(inputElement, inputErrorClass, errorClass) {
        const errorMassage = inputElement.parentElement.querySelector(`.${inputElement.id}-error`);

        if (this._checkInputValidity(inputElement)) {
            this._hideErrorMessage(errorMassage, errorClass);
            inputElement.classList.remove(inputErrorClass);
        } else {
            this._showErrorMessage(errorMassage, errorClass);
            inputElement.classList.add(inputErrorClass);
        }
    }

    // ! this function checkes if the form is valid
    _checkFormValidity(formElement, inputSelector) {
        const inputList = [...formElement.querySelectorAll(inputSelector)];
        let isValid = true;
        for (let i = 0; i < inputList.length; i++) {
            if (!this._checkInputValidity(inputList[i])) {
                isValid = false;
            }
        }
        return isValid;
    }

    // ! this function hides the error massage
    _hideErrorMessage(errorMassage, errorClass) {
        errorMassage.classList.remove(errorClass);
    }

    // ! this function shows the error massage
    _showErrorMessage(errorMassage, errorClass) {
        errorMassage.classList.add(errorClass);
    }

    // ! this function handles the button state according to the form validity
    _handleForm(submitButtonSelector, inactiveButtonClass, inputSelector) {
        const formButton = this._form.querySelector(submitButtonSelector);
        if (this._checkFormValidity(this._form, inputSelector)) {
            this._toggleButtonState(formButton, inactiveButtonClass, true);
        } else {
            this._toggleButtonState(formButton, inactiveButtonClass, false);
        }
    }

    // ! this function checkes if the input is valid
    _checkInputValidity(inputElement) {
        return inputElement.validity.valid;
    }

    // ! this function toggles button state
    _toggleButtonState(button, inactiveButtonClass, isValid) {
        if (isValid) {
            button.classList.remove(inactiveButtonClass);
            button.disabled = false;
        } else {
            button.classList.add(inactiveButtonClass);
            button.disabled = true;
        }
    }
}