let editButton = document.querySelector(".profile__edit-button");
let popupWindow = document.querySelector(".popup");
let addPopup = document.querySelector(".add")
let addCloseButton = document.getElementById("addCloseButton");
let editCloseButton = document.getElementById("editCloseButton");
let editFormElement = document.getElementById("editform");
let nameInput = document.getElementById("popupname");
let jobInput = document.getElementById("popupaboutme");
let popupTitle = popupWindow.querySelector(".popup__title");
let profileName = document.getElementById("profilename");
let profileAboutMe = document.getElementById("profiledescription");
let addButton = document.querySelector(".profile__add-button");
let cards = document.querySelector(".cards");
let titleInput = document.getElementById("title");
let imageLinkInput = document.getElementById("imagelink");
let addFormElement = document.getElementById("addform");

// ! initial cards
const cardsArray = [{
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

// ! cards
function createCards() {
    for (let i = 0; i < cardsArray.length; i++) {
        createCard(cardsArray[i]);
    }
}

// * * this function creates a card from the cardArray it takes a card as a parameter
function createCard(cardElem) {
    // ! creating card
    let card = document.createElement("div");
    card.classList.add("card");

    // ! creating image and trash icon
    let cardDelete = document.createElement("img");
    let cardImage = document.createElement("img");
    cardDelete.classList.add("card__delete");
    cardImage.classList.add("card__image");
    cardImage.setAttribute("src", cardElem.link);
    cardImage.setAttribute("alt", cardElem.name);
    cardDelete.setAttribute("src", "./images/trash_icon.svg");

    // ! creating card name and like button
    let cardInfo = document.createElement("div");
    cardInfo.classList.add("card__info");
    let cardText = document.createElement("h2");
    cardText.classList.add("card__text", "text-hiding");
    cardText.textContent = cardElem.name;
    let cardButton = document.createElement("button");
    cardButton.classList.add("card__like-button");

    // ! appending the elements according to correct sequence
    cardInfo.append(cardText, cardButton);
    card.append(cardDelete, cardImage, cardInfo);
    cards.append(card);
}

createCards();
let cardDeleteArray = document.querySelectorAll(".card__delete");

// ! likes
let likeButtons = document.querySelectorAll(".card__like-button");

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

// ! popup toggle
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

// ! open image popup
let cardImageArray = document.querySelectorAll(".card__image");
let imagePopup = document.querySelector(".image")
let imageCloseButton = document.querySelector(".popup__close-button_image");
for (let i = 0; i < cardImageArray.length; i++) {
    cardImageArray[i].addEventListener("click", openImagePopup);
}

function openImagePopup(evt) {
    let popupImage = document.createElement("img");
    popupImage.classList.add("popup__image");
    popupImage.setAttribute("src", evt.currentTarget.src);
    imagePopup.append(popupImage);
    imagePopup.classList.toggle("popup_opened")
}


function closeImagePopup() {
    imagePopup.classList.remove("popup_opened")
    imagePopup.removeChild(imagePopup.childNodes[3]);
}

// ! edit form handle
function handleProfileFormSubmit(evt) {
    evt.preventDefault();

    let nameInputText = nameInput.value;
    let jobInputText = jobInput.value;

    profileName.textContent = nameInputText;
    profileAboutMe.textContent = jobInputText;

    toggleEditPopupWindow();
}

// ! add form handle
function handleAddFormSubmit(evt) {
    evt.preventDefault();

    let titleInputText = titleInput.value;
    let imageLinkText = imageLinkInput.value;

    createCard({
        name: titleInputText,
        link: imageLinkText
    })

    toggleAddPopupWindow();
}

// ! delete card
for (let j = 0; j < cardDeleteArray.length; j++) {
    cardDeleteArray[j].addEventListener("click", deleteCard);
}

function deleteCard(evt) {
    cards.removeChild(evt.currentTarget.parentElement);
}

// ! calling event listeners
addFormElement.addEventListener("submit", handleAddFormSubmit);

imageCloseButton.addEventListener("click", closeImagePopup);

editCloseButton.addEventListener("click", toggleEditPopupWindow);

addCloseButton.addEventListener("click", toggleAddPopupWindow);

editFormElement.addEventListener("submit", handleProfileFormSubmit);

editButton.addEventListener("click", toggleEditPopupWindow);

addButton.addEventListener("click", toggleAddPopupWindow);