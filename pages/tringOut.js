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
            handleForm(formElement, submitButtonSelector, inactiveButtonClass, inputSelector);
        });
    }
}

function checkInputValidity(inputElement) {
    return inputElement.validity.valid;
}

// ! this function handles the error and button state according to the input
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

enableValidation({
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_invalid",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error-massage_visible"
});