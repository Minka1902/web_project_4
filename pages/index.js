let editButton = document.querySelector(".profile__edit-button");
let popupWindow = document.querySelector(".popup");
let closeButton = document.querySelector(".popup__close-button")
let formElement = document.querySelector(".popup__form");
let nameInput = document.getElementById("popupname");
let jobInput = document.getElementById("popupaboutme");
let profileName = document.getElementById("profilename");
let profileAboutMe = document.getElementById("profiledescription");

function togglePopupWindow() {
    if (!popupWindow.classList.contains("popup_opened")) {
        popupWindow.classList.add("popup_opened");
    } else {
        popupWindow.classList.remove("popup_opened");
        nameInput.value = profileName.textContent;
        jobInput.value = profileAboutMe.textContent;
    }
}

function handleProfileFormSubmit(evt) {
    evt.preventDefault();

    let nameInputText = nameInput.value;
    let jobInputText = jobInput.value;

    profileName.textContent = nameInputText;
    profileAboutMe.textContent = jobInputText;

    togglePopupWindow();
}

closeButton.addEventListener("click", togglePopupWindow);

formElement.addEventListener("submit", handleProfileFormSubmit);

editButton.addEventListener("click", togglePopupWindow);