function checkValidity(formElement) {
    // ! this function checkes if the form is valid
    const inputList = formElement.querySelectorAll(".popup__input");
    inputList.forEach((inputElement) => {
        if (!inputElement.validity.valid) {
            formElement.querySelector(".popup__button").classList.add("popup__button_invalid");
            return false;
        }
    });
    return true;
}

inputArray.forEach((inputElement) => {
    inputElement.addEventListener("keydown", function(evt) {
        const formButton = evt.target.form.querySelector(".popup__button");

        // * * here i link the error massage to the correct input
        const errorMessage = evt.target.parentElement.querySelector(`.${evt.target.id}-error`);

        // ! this part of the function removes the classes and attributes that
        // ! make the input error massage appear and disappeare 
        if (checkValidity(evt.target.parentElement)) {
            toggleButtonState(formButton);
            errorMessage.classList.remove("popup__error-massage_visible");
            evt.target.classList.remove("popup__input_type_error");
            formButton.disabled = false;
        } else {
            toggleButtonState(formButton);
            errorMessage.classList.add("popup__error-massage_visible");
            evt.target.classList.add("popup__input_type_error");
            formButton.disabled = true;
        }
    });
});

function toggleButtonState(button) {
    button.classList.toggle("popup__button_invalid");
}