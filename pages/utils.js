const nameInput = document.getElementById("popupname");
const jobInput = document.getElementById("popupaboutme");
const profileName = document.getElementById("profilename");
const profileAboutMe = document.getElementById("profiledescription");

// ! popup toggle
function openPopup(popup) { // * * takes a popup as a parameter and opens it
    popup.classList.add('popup_opened');
    document.addEventListener("keydown", checkEscapeClicked);
}

function closePopup(popup) { // * * takes a popup as a parameter and closes it
    popup.classList.remove('popup_opened');
    const addFormElement = document.getElementById("addform");
    document.removeEventListener("keydown", checkEscapeClicked);
    if (popup.classList.contains("popup_add")) {
        addFormElement.reset();
    }
}

// ! Escape
// * * this function checks if the "Escape" button was clicked if so she closes the popup 
function checkEscapeClicked(evt) {
    if (evt.code == "Escape") {
        closePopup(document.querySelector(".popup_opened"));
    }
}

// * * this function toggles the popup window for the edit window 
function toggleEditPopupWindow() {
    const profilePopup = document.querySelector(".popup_profile");
    if (!profilePopup.classList.contains("popup_opened")) {
        openPopup(profilePopup);
        nameInput.value = profileName.textContent;
        jobInput.value = profileAboutMe.textContent;
    } else {
        closePopup(profilePopup);
    }
}

// * * this function toggles the popup window for the add window 
function toggleAddPopupWindow() {
    const addPopup = document.querySelector(".popup_add")
    if (!addPopup.classList.contains("popup_opened")) {
        openPopup(addPopup);
    } else {
        closePopup(addPopup);
    }
}

// * * this function toggles the popup window for the image window 
function closeImagePopup() {
    const imagePopup = document.querySelector(".popup_image");
    closePopup(imagePopup);
}

export { closeImagePopup, toggleAddPopupWindow, toggleEditPopupWindow, closePopup, openPopup };