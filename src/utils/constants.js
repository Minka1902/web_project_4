import FormValidator from "../components/FormValidator";
import PopupWithImage from "../components/PopupWithImage";
import PopupWithForm from "../components/PopupWithForm";
import PopupConfirm from "../components/PopupConfirm";
import Section from "../components/Section";
import Api from "../components/Api";
import Card from "../components/Card"
import UserInfo from "../components/UserInfo";

// ! user
export const userInfo = new UserInfo({ name: ".profile__name", job: ".profile__about-me", avatar: ".profile__avatar" });

// ! buttons
export const editButton = document.querySelector(".profile__edit-button");
export const addButton = document.querySelector(".profile__add-button");
export const avatarButton = document.querySelector(".profile__image-button");

// ! popup
export const profilePopup = new PopupWithForm(".popup_profile", handleProfileFormSubmit);
export const confirmPopup = new PopupConfirm(".popup_confirm", ".popup__button");
export const addPopup = new PopupWithForm(".popup_add", handleAddFormSubmit);
export const avatarPopup = new PopupWithForm(".popup_avatar", handleAvatarFormSubmit);
export const imagePopup = new PopupWithImage(".popup_image");

// ! forms
export const editFormElement = document.getElementById("editform");
export const addFormElement = document.getElementById("addform");
export const avatarFormElement = document.getElementById("avatarform");
const formSettings = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_invalid",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error-massage_visible"
};
export const avatarFormValidator = new FormValidator(formSettings, avatarFormElement)
export const addFormValidator = new FormValidator(formSettings, addFormElement);
export const editFormValidator = new FormValidator(formSettings, editFormElement);

// ! inputs
export const avatarUrlInput = document.getElementById("avatar");
export const nameInput = document.getElementById("popupname");
export const jobInput = document.getElementById("popupaboutme");

// !input help
const titleInput = document.getElementById("title");
const imageLinkInput = document.getElementById("imagelink");


// ! api
const apiOptions = {
    baseUrl: "https://around.nomoreparties.co/v1/group-12",
    headers: {
        authorization: "614bb6fa-36a6-4d24-9b95-72bf17bccf61",
        "Content-Type": "application/json"
    }
}
export const api = new Api(apiOptions);

// ! initial cards
export const cardsData = [];

// ! section
export const cardsSection = new Section({ items: cardsData, renderer: createCard }, ".cards", api);

// ! create cards
function createCard(cardObj, api) {
    const card = new Card(cardObj.name,
        cardObj.link,
        cardObj.id,
        cardObj.likes,
        handleImageClick,
        confirmPopup,
        cardObj.owner,
        userInfo);

    return card.generateCard(api);
}

// ! edit popup and form handling
// * this function toggles the popup window for the edit window 
export function toggleEditPopupWindow() {
    if (!profilePopup.checkIfOpened()) {
        profilePopup.open();
        const { name, job } = userInfo.getUserInfo()
        nameInput.value = name;
        jobInput.value = job;
    } else {
        profilePopup.close("popup_profile");
    }
}

// * edit form handle
function handleProfileFormSubmit(evt) {
    evt.preventDefault();

    const userObj = { name: nameInput.value, about: jobInput.value };
    userInfo.setUserInfo(userObj);

    api.changeUserInfo(nameInput, jobInput)
        .finally(() => {
            profilePopup.querySelector(".popup__button").textContent = "Save";
        }).catch((err) => {
            console.log(err);
        });

    toggleEditPopupWindow();
}

// ! add popup and form handling
// * this function toggles the popup window for the add window 
export function toggleAddPopupWindow() {
    if (!addPopup.checkIfOpened()) {
        addPopup.open();
    } else {
        addPopup.close("popup_add");
    }
}


// * add form handle
export function handleAddFormSubmit(evt) {
    evt.preventDefault();

    api.addCard(titleInput, imageLinkInput)
        .finally(() => {
            addPopup.querySelector(".popup__button").textContent = "Save";
        }).catch((err) => {
            console.log(err);
        });

    addFormValidator.toggleButtonState(false);
    cardsSection.addItem({
        name: titleInput.value,
        link: imageLinkInput.value,
        likes: [],
        owner: userInfo.getMe()
    });

    toggleAddPopupWindow();
}

// ! avatar popup and form handling
// * this function toggles the popup window for the avatar window 
export function toggleAvatarPopupWindow() {
    if (!avatarPopup.checkIfOpened()) {
        avatarPopup.open();
    } else {
        avatarPopup.close("popup_avatar");
    }
}

// * avatar form handle
export function handleAvatarFormSubmit(evt) {
    evt.preventDefault();

    userInfo.setUserUrl(avatarUrlInput.value);

    api.changeAvatar(avatarUrlInput)
        .finally(() => {
            avatarPopup.querySelector(".popup__button").textContent = "Save";
        }).catch((err) => {
            console.log(err);
        });

    toggleAvatarPopupWindow();
}

// ! image popup handle
export function handleImageClick({ url, caption }) {
    imagePopup.open({ url, caption });
}