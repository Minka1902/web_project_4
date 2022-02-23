// ! popup toggle
// function openPopup(popup) { // * * takes a popup as a parameter and opens it
//     popup.classList.add('popup_opened');
//     document.addEventListener("keydown", checkEscapeClicked);
// }

// function closePopup(popup) { // * * takes a popup as a parameter and closes it
//     document.removeEventListener("keydown", checkEscapeClicked);
//     popup.classList.remove('popup_opened');
// }

// ! Escape
// * * this function checks if the "Escape" button was clicked if so she closes the popup 
function checkEscapeClicked(evt) {
    if (evt.code == "Escape") {
        closePopup(document.querySelector(".popup_opened"));
    }
}

export { checkEscapeClicked };