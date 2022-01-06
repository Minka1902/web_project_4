const editButton = document.querySelector(".profile__edit-button");
const profilePopup = document.querySelector(".profile_popup");
const addPopup = document.querySelector(".add_popup")
const addCloseButton = document.getElementById("addCloseButton");
const editCloseButton = document.getElementById("editCloseButton");
const editFormElement = document.getElementById("editform");
const nameInput = document.getElementById("popupname");
const jobInput = document.getElementById("popupaboutme");
const popupTitle = profilePopup.querySelector(".popup__title");
const profileName = document.getElementById("profilename");
const profileAboutMe = document.getElementById("profiledescription");
const addButton = document.querySelector(".profile__add-button");
const cards = document.querySelector(".cards");
const titleInput = document.getElementById("title");
const imageLinkInput = document.getElementById("imagelink");
const addFormElement = document.getElementById("addform");
let cardTemplate = document.querySelector("#cardtemplate").content;
let cardDeleteArray = document.querySelectorAll(".card__delete");
let likeButtons = document.querySelectorAll(".card__like-button");
let cardImageArray = document.querySelectorAll(".card__image");

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

// * * this function creates a card from the cardArray it takes a card as a parameter and 
// * * calls the addEventListener for every card
function createCard(cardElem) {
    const card = cardTemplate.querySelector(".card").cloneNode(true);
    card.querySelector(".card__text").textContent = cardElem.name;
    card.querySelector(".card__image").src = cardElem.link;
    card.querySelector(".card__image").alt = "A view of " + cardElem.name;
    cards.prepend(card);
    likeButtons = document.querySelectorAll(".card__like-button");
    cardDeleteArray = document.querySelectorAll(".card__delete");
    cardImageArray = document.querySelectorAll(".card__image");
    likeButtons[0].addEventListener("click", toggleLikeButton);
    cardDeleteArray[0].addEventListener("click", deleteCard);
    cardImageArray[0].addEventListener("click", toggleImagePopupWindow);
}

createCards();

// ! likes
// * * this function toggles likes for the cards
function toggleLikeButton(event) {
    event.currentTarget.classList.toggle("info__card_like-button_state_active");
}

// ! popup toggle
function openPopup(popup) { // * * takes a popup as a parameter and opens it
    popup.classList.add('popup_opened');
}

function closePopup(popup) { // * * takes a popup as a parameter and closes it
    popup.classList.remove('popup_opened');
}

// * * this function toggles the popup window for the edit window 
function toggleEditPopupWindow() {
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
    if (!addPopup.classList.contains("popup_opened")) {
        openPopup(addPopup);
    } else {
        closePopup(addPopup);
    }
}

// ! open image popup
let imagePopup = document.querySelector(".image_popup");
let imageCloseButton = document.querySelector(".popup__close-button_image");

function toggleImagePopupWindow(evt) {
    if (!imagePopup.classList.contains("popup_opened")) {
        let createdPopupImage = document.querySelector(".popup__image");
        createdPopupImage.setAttribute("src", evt.currentTarget.src);
        createdPopupImage.setAttribute("alt", evt.currentTarget.alt);
        openPopup(imagePopup);
    } else {
        closePopup(imagePopup);
        imagePopup.removeChild(imagePopup.childNodes[3]);
    }
}

// ! edit form handle
function handleProfileFormSubmit(evt) {
    evt.preventDefault();

    let nameInputText = nameInput.value;
    let jobInputText = jobInput.value;


    profileName.textContent = nameInputText;
    profileAboutMe.textContent = jobInputText;

    editFormElement.reset();
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

    addFormElement.reset();
    toggleAddPopupWindow();
}

// ! delete card
function deleteCard(evt) {
    cards.removeChild(evt.currentTarget.parentElement);
}

// ! calling event listeners
addFormElement.addEventListener("submit", handleAddFormSubmit);

imageCloseButton.addEventListener("click", toggleImagePopupWindow);

editCloseButton.addEventListener("click", toggleEditPopupWindow);

addCloseButton.addEventListener("click", toggleAddPopupWindow);

editFormElement.addEventListener("submit", handleProfileFormSubmit);

editButton.addEventListener("click", toggleEditPopupWindow);

addButton.addEventListener("click", toggleAddPopupWindow);