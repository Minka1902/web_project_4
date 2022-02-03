function enableValidation(settings) {
    const {
        formSelector,
        inputSelector,
        submitButtonSelector,
        inactiveButtonClass,
        inputErrorClass,
        errorClass
    } = settings || {};

    if (formSelector) {
        const forms = [...document.querySelectorAll(formSelector)];
        forms.forEach((formElement) => {
            formElement.addEventListener("submit", (e) => e.preventDefault());
            const inputs = [...formElement.querySelectorAll(inputSelector)];
            inputs.forEach((inputElement) => {
                inputElement.addEventListener("input", function(evt) {
                    handleInputEvent(evt.target, inputErrorClass, errorClass);
                    handleForm(inputElement.parentElement, submitButtonSelector, inactiveButtonClass, inputSelector);
                });
            });
        });
    }
}

// enableValidation({
//     formSelector: ".popup__form",
//     inputSelector: ".popup__input",
//     submitButtonSelector: ".popup__button",
//     inactiveButtonClass: "popup__button_invalid",
//     inputErrorClass: "popup__input_type_error",
//     errorClass: "popup__error-massage_visible"
// });

// ! this function checkes if the input is valid
function checkInputValidity(inputElement) {
    return inputElement.validity.valid;
}

// ! this function checkes if the form is valid
function checkFormValidity(formElement, inputSelector) {
    const inputList = [...formElement.querySelectorAll(inputSelector)];
    let isValid = true;
    for (let i = 0; i < inputList.length; i++) {
        if (!checkInputValidity(inputList[i])) {
            isValid = false;
        }
    }
    return isValid;
}

// ! this function hides the error massage
function hideErrorMessage(errorMassage, errorClass) {
    errorMassage.classList.remove(errorClass);
}

// ! this function shows the error massage
function showErrorMessage(errorMassage, errorClass) {
    errorMassage.classList.add(errorClass);
}

// ! this function handles the button state according to the form validity
function handleForm(formElement, submitButtonSelector, inactiveButtonClass, inputSelector) {
    const formButton = formElement.querySelector(submitButtonSelector);
    if (checkFormValidity(formElement, inputSelector)) {
        toggleButtonState(formButton, inactiveButtonClass, true);
    } else {
        toggleButtonState(formButton, inactiveButtonClass, false);
    }
}

// ! this function handles the error massage state according to the input validity
function handleInputEvent(inputElement, inputErrorClass, errorClass) {
    const errorMassage = inputElement.parentElement.querySelector(`.${inputElement.id}-error`);

    if (checkInputValidity(inputElement)) {
        hideErrorMessage(errorMassage, errorClass);
        inputElement.classList.remove(inputErrorClass);
    } else {
        showErrorMessage(errorMassage, errorClass);
        inputElement.classList.add(inputErrorClass);
    }
}

// ! this function toggles button state
function toggleButtonState(button, inactiveButtonClass, isValid) {
    if (isValid) {
        button.classList.remove(inactiveButtonClass);
        button.disabled = false;
    } else {
        button.classList.add(inactiveButtonClass);
        button.disabled = true;
    }
}