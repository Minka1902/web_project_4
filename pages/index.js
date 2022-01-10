const editButton = document.querySelector(".profile__edit-button");
const profilePopup = document.querySelector(".popup_profile");
const addPopup = document.querySelector(".popup_add")
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
const cardTemplate = document.querySelector("#cardtemplate").content;
const createdPopupImage = document.querySelector(".popup__image");
const createdPopupText = document.querySelector(".popup__text");

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

function createCard(cardElem) {
    const carde = getCard(cardElem);
    cards.prepend(carde);
}

// * * this function creates a card from the cardArray it takes a card as a parameter and 
// * * calls the addEventListener for every card
function getCard(cardElem) {
    const card = cardTemplate.querySelector(".card").cloneNode(true);
    const cardImage = card.querySelector(".card__image");
    card.querySelector(".card__text").textContent = cardElem.name;
    cardImage.src = cardElem.link;
    cardImage.alt = "A view of " + cardElem.name;
    card.querySelector(".card__like-button").addEventListener("click", toggleLikeButton);
    card.querySelector(".card__delete").addEventListener("click", deleteCard);
    cardImage.addEventListener("click", toggleImagePopupWindow);
    return card;
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
const imagePopup = document.querySelector(".popup_image");
const imageCloseButton = document.querySelector(".popup__close-button_image");

function toggleImagePopupWindow(evt) {
    if (!imagePopup.classList.contains("popup_opened")) {
        createdPopupImage.setAttribute("src", evt.currentTarget.src);
        createdPopupImage.setAttribute("alt", evt.currentTarget.alt);
        createdPopupText.textContent = evt.currentTarget.parentElement.textContent;
        openPopup(imagePopup);
    } else {
        closePopup(imagePopup);
    }
}

// ! edit form handle
function handleProfileFormSubmit(evt) {
    evt.preventDefault();

    const nameInputText = nameInput.value;
    const jobInputText = jobInput.value;


    profileName.textContent = nameInputText;
    profileAboutMe.textContent = jobInputText;

    toggleEditPopupWindow();
}

// ! add form handle
function handleAddFormSubmit(evt) {
    evt.preventDefault();

    const titleInputText = titleInput.value;
    const imageLinkText = imageLinkInput.value;

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