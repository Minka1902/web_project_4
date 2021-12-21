var likeButtons = document.querySelectorAll(".card__info_like-button");
let editButton = document.querySelector(".profile__edit-button");
let popup = document.querySelector(".popup");
let closeButton = document.querySelector(".popup__close-button");
let saveButton = document.querySelector(".popup__button");
let profileName = document.getElementById("username");
let profileAboutMe = document.getElementById("aboutme");
let popupName = document.getElementById("popupname");
let popupAboutMe = document.getElementById("popupaboutme");

function openPopupWindow() {
    popup.classList.add("popup__display")
    closeButton.classList.add("popup__display")
}

function closePopupWindow() {
    popup.classList.remove("popup__display")
    closeButton.classList.remove("popup__display")
}

// function likeClicked(i) {
//     if (likeButtons[i].getAttribute("src") == "./images/like.png") {
//         likeButtons[i].setAttribute("src", "./images/like_checked.png");
//     } else { likeButtons[i].setAttribute("src", "./images/like.png"); }
// }

function savePopupWindow() {
    let nameTxt = popupName.value;
    if (!(nameTxt === "")) {
        profileName.textContent = nameTxt;
        popupName.setAttribute("placeholder", nameTxt);
        popupAboutMe.setAttribute("text", "");
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

// for (var i = 0; i < likeButtons.length; i++) {
//     likeButtons[i].addEventListener("click", likeClicked(i));
// }