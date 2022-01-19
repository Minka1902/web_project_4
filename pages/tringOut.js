function enableValidation({
    formSelector,
    inputSelector,
    submitButtonSelector,
    inactiveButtonClass,
    inputErrorClass,
    errorClass
}) {
    // ! i dont understand what to do here
    // ! if you can explain or give me an example it would be great
}

const inputSelector = addPopup.querySelector("#addform");
const formButton = addPopup.querySelector("popup__button");
const invalidButtonClass = "popup__button_invalid";
const inputErrorClass = "popup__input_type_error";
const errorClass = "popup__error-massage";
enableValidation({ addPopup, inputSelector, formButton, inactiveButtonClass, inputErrorClass, errorClass });

// inputArray.forEach((inputElement) => {
//     inputElement.addEventListener("keydown", function(evt) {
//         const formButton = evt.target.form.querySelector(".popup__button");

//         // * * here i link the error massage to the correct input
//         const errorMessage = evt.target.parentElement.querySelector(`.${evt.target.id}-error`);

//         // ! this part of the function removes the classes and attributes that
//         // ! make the input error massage appear and disappeare 
//         if (checkValidity(evt.target.parentElement)) {
//             toggleButtonState(formButton);
//             errorMessage.classList.remove("popup__error-massage_visible");
//             evt.target.classList.remove("popup__input_type_error");
//             formButton.disabled = false;
//         } else {
//             toggleButtonState(formButton);
//             errorMessage.classList.add("popup__error-massage_visible");
//             evt.target.classList.add("popup__input_type_error");
//             formButton.disabled = true;
//         }
//     });
// });