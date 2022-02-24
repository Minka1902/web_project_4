 import Card from "./components/Card";
 import FormValidator from "./components/FormValidator";
 import "./styles/index.css";
 import Popup from "./components/Popup";
 import PopupWithForm from "./components/PopupWithForm";
 import UserInfo from "./components/UserInfo";
 import Section from "./components/Section";

 // ! user
 const userInfo = new UserInfo({ name: "Jacques Cousteau", job: "Explorer" });
 // ! buttons
 const editButton = document.querySelector(".profile__edit-button");
 const addButton = document.querySelector(".profile__add-button");
 // ! popup
 const imagePopup = new Popup(".popup_image");
 imagePopup.setEventListeners();
 const profilePopup = new PopupWithForm(".popup_profile", handleProfileFormSubmit);
 profilePopup.setEventListeners();
 const addPopup = new PopupWithForm(".popup_add", handleAddFormSubmit);
 addPopup.setEventListeners();
 // ! forms
 const editFormElement = document.getElementById("editform");
 const addFormElement = document.getElementById("addform");
 const settings = {
     formSelector: ".popup__form",
     inputSelector: ".popup__input",
     submitButtonSelector: ".popup__button",
     inactiveButtonClass: "popup__button_invalid",
     inputErrorClass: "popup__input_type_error",
     errorClass: "popup__error-massage_visible"
 };
 const addFormValidator = new FormValidator(settings, addFormElement);
 const editFormValidator = new FormValidator(settings, editFormElement);
 // ! inputs
 const nameInput = document.getElementById("popupname");
 const jobInput = document.getElementById("popupaboutme");
 // !input help
 const profileName = document.getElementById("profilename");
 const profileAboutMe = document.getElementById("profiledescription");
 const titleInput = document.getElementById("title");
 const imageLinkInput = document.getElementById("imagelink");
 // ! arrays
 const popupArray = document.querySelectorAll(".popup");
 const cards = document.querySelector(".cards");

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

 function createCards() {
     for (let i = 0; i < this._items.length; i++) {
         const card = new Card(this._items[i].name, this._items[i].link);
         cardsSection.addItem(card.generateCard());
     }
 }

 const cardsSection = new Section({ items: cardsArray, renderer: createCards }, "cards")
 cardsSection.render()

 addFormValidator.enableValidation();
 editFormValidator.enableValidation();

 // ! edit form handle
 function handleProfileFormSubmit(evt) {
     evt.preventDefault();

     const nameInputText = nameInput.value;
     const jobInputText = jobInput.value;
     const userObj = { name: nameInputText.value, job: jobInputText.value };
     userInfo.setUserInfo(userObj);

     profileName.textContent = nameInputText;
     profileAboutMe.textContent = jobInputText;

     toggleEditPopupWindow();
 }

 function imageClickHandler(evt) {
     imagePopup.open();
     const image = imagePopup.querySelector(".popup__image");
     image.setAttribute("src", evt.target);
     image.setAttribute("alt", this._name);
     imagePopup.querySelector(".popup__text").textContent = this._name;
 }

 // ! add form handle
 function handleAddFormSubmit(evt) {
     evt.preventDefault();

     const titleInputText = titleInput.value;
     const imageLinkText = imageLinkInput.value;

     const card = new Card(titleInputText, imageLinkText);
     cardsSection.addItem(card.generateCard());

     addFormElement.reset();
     addFormValidator.enableValidation();
     toggleAddPopupWindow();
 }

 // * * this function toggles the popup window for the edit window 
 function toggleEditPopupWindow() {
     if (!profilePopup.classContains("popup_opened")) {
         profilePopup.open();
         const { name, job } = userInfo.getUserInfo()
         nameInput.value = name;
         jobInput.value = job;
     } else {
         profilePopup.close();
     }
 }

 // * * this function toggles the popup window for the add window 
 function toggleAddPopupWindow() {
     if (!addPopup.classContains("popup_opened")) {
         addFormElement.reset();
         addPopup.open();
     } else {
         addPopup.close();
     }
 }

 // ! calling event listeners
 addButton.addEventListener("click", toggleAddPopupWindow);

 editButton.addEventListener("click", toggleEditPopupWindow);