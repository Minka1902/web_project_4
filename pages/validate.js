function checkValidity(formElement) {
    // ! this function checkes if the form is valid
    const inputList = formElement.querySelectorAll(".popup__input");
    let isValid = true;
    for (let i = 0; i < inputList.length; i++) {
        if (!inputList[i].validity.valid) {
            isValid = false;
        }
    }
    return isValid;
}

// ! this function hides the error massage
function hideErrorMessage(errorMassage) {
    errorMassage.classList.remove("popup__error-massage_visible");
}

// ! this function shows the error massage
function showErrorMessage(errorMassage) {
    errorMassage.classList.add("popup__error-massage_visible");
}

// ! this function handles the error and button state according to the input
function handleInput(inputElement) {
    const errorMassage = inputElement.parentElement.querySelector(`.${inputElement.id}-error`);

    if (inputElement.validity.valid) {
        hideErrorMessage(errorMassage);
        inputElement.classList.remove("popup__input_type_error");
    } else {
        showErrorMessage(errorMassage);
        inputElement.classList.add("popup__input_type_error");
    }
    handleForm(inputElement.parentElement);
}

function handleForm(formElement) {
    const formButton = formElement.querySelector(".popup__button");
    if (checkValidity(formElement)) {
        toggleButtonState(formButton, true);
    } else {
        toggleButtonState(formButton, false);
    }
}

inputArray.forEach((inputElement) => {
    inputElement.addEventListener("input", function(evt) {
        handleInput(evt.target);
    });
});

function toggleButtonState(button, isValid) {
    if (isValid) {
        button.classList.remove("popup__button_invalid");
        button.disabled = false;
    } else {
        button.classList.add("popup__button_invalid");
        button.disabled = true;
    }
}