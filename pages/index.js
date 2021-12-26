let editButton = document.querySelector(".profile__edit-button");
let popupWindow = document.querySelector(".popup");
let closeButton = document.querySelector(".popup__close-button")
let formElement = document.querySelector(".popup__form");

function togglePopupWindow() {
    if (!popupWindow.classList.contains("popup_opened")) {
        popupWindow.classList.add("popup_opened")
    } else {
        popupWindow.classList.remove("popup_opened")
    }
}

function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    let nameInput = document.getElementById("popupname");
    let jobInput = document.getElementById("popupaboutme");

    let nameInputText = nameInput.value;
    let jobInputText = jobInput.value;

    let profileName = document.getElementById("profilename");
    let profileAboutMe = document.getElementById("profiledescription");

    profileName.textContent = nameInputText;
    profileAboutMe.textContent = jobInputText;

    togglePopupWindow();
}

closeButton.addEventListener("click", togglePopupWindow);

formElement.addEventListener("submit", handleProfileFormSubmit);

editButton.addEventListener("click", togglePopupWindow);