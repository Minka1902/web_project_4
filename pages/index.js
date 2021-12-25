let editButton = document.querySelector(".profile__edit-button");
let popup = document.querySelector(".popup");
let closeButton = document.querySelector(".popup__close-button");
let saveButton = document.querySelector(".popup__button");
let profileName = document.getElementById("username");
let profileAboutMe = document.getElementById("aboutme");
let popupName = document.getElementById("popupname");
let popupAboutMe = document.getElementById("popupaboutme");
let popupOverlay = document.getElementById("overlay");

function openPopupWindow() {
    popup.classList.add("popup__displayed")
    popupOverlay.classList.add("popup__overlay")
}

function closePopupWindow() {
    popup.classList.remove("popup__displayed")
    popupOverlay.classList.remove("popup__overlay")
}

function savePopupWindow() {
    let nameTxt = popupName.value;
    if (!(nameTxt === "")) {
        profileName.textContent = nameTxt;
        popupName.setAttribute("placeholder", nameTxt);
        popupName.setAttribute("text", "");
    }

    let aboutMeTxt = popupAboutMe.value;
    if (!(aboutMeTxt === "")) {
        profileAboutMe.textContent = aboutMeTxt;
        popupAboutMe.setAttribute("placeholder", aboutMeTxt);
        popupAboutMe.value = "";
    }

    closePopupWindow();
}


editButton.addEventListener("click", openPopupWindow);

closeButton.addEventListener("click", closePopupWindow);

saveButton.addEventListener("click", savePopupWindow);