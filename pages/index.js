let editButton = document.querySelector(".profile__edit-button");
let popupWindow = document.querySelector(".popup");
let addPopup = document.querySelector(".add")
let addCloseButton = document.getElementById("addCloseButton");
let editCloseButton = document.getElementById("editCloseButton");
let formElement = document.querySelector(".popup__form");
let nameInput = document.getElementById("popupname");
let jobInput = document.getElementById("popupaboutme");
let popupTitle = popupWindow.querySelector(".popup__title");
let profileName = document.getElementById("profilename");
let profileAboutMe = document.getElementById("profiledescription");
let addButton = document.querySelector(".profile__add-button");
let cards = document.querySelector(".cards");
const likeButtons = document.querySelectorAll(".card__like-button");

// ! initial cards
const initialCards = [{
        name: "Yosemite Valley",
        link: "https://code.s3.yandex.net/web-code/yosemite.jpg"
    },
    {
        name: "Lake Louise",
        link: "https://code.s3.yandex.net/web-code/lake-louise.jpg"
    },
    {
        name: "Bald Mountains",
        link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg"
    },
    {
        name: "Latemar",
        link: "https://code.s3.yandex.net/web-code/latemar.jpg"
    },
    {
        name: "Vanoise National Park",
        link: "https://code.s3.yandex.net/web-code/vanoise.jpg"
    },
    {
        name: "Lago di Braies",
        link: "https://code.s3.yandex.net/web-code/lago.jpg"
    }
];

for (let i = 0; i < likeButtons.length; i++) {
    likeButtons[i].addEventListener("click", toggleLikeButton);
}

function toggleLikeButton(event) {
    if (!event.currentTarget.classList.contains("info__card_like-button_state_active")) {
        event.currentTarget.classList.add("info__card_like-button_state_active");
    } else {
        event.currentTarget.classList.remove("info__card_like-button_state_active");
    }
}

// function createCard() {
//     const card = cards.createElement("div");
//     card.classList.add("card");
//     const cardImage = card.createElement("img");
//     cardImage.classList.add("card__image");
//     cardImage.setAttribute("src", "./images/cards_image4.png");
//     cards.append(card);
// }

function toggleEditPopupWindow() {
    if (!popupWindow.classList.contains("popup_opened")) {
        popupWindow.classList.add("popup_opened");
        nameInput.value = profileName.textContent;
        jobInput.value = profileAboutMe.textContent;
    } else {
        popupWindow.classList.remove("popup_opened");
    }
}

function toggleAddPopupWindow() {
    if (!addPopup.classList.contains("popup_opened")) {
        addPopup.classList.add("popup_opened");
    } else {
        addPopup.classList.remove("popup_opened");
    }
}

function handleProfileFormSubmit(evt) {
    evt.preventDefault();

    let nameInputText = nameInput.value;
    let jobInputText = jobInput.value;

    profileName.textContent = nameInputText;
    profileAboutMe.textContent = jobInputText;

    toggleEditPopupWindow();
}

editCloseButton.addEventListener("click", toggleEditPopupWindow);

addCloseButton.addEventListener("click", toggleAddPopupWindow);

formElement.addEventListener("submit", handleProfileFormSubmit);

editButton.addEventListener("click", toggleEditPopupWindow);

addButton.addEventListener("click", toggleAddPopupWindow);