 import Card from "./components/Card";
 import FormValidator from "./components/FormValidator";
 import "./styles/index.css";
 import PopupWithForm from "./components/PopupWithForm";
 import UserInfo from "./components/UserInfo";
 import Section from "./components/Section";

 // ! user
 const userInfo = new UserInfo({ name: ".profile__name", job: ".profile__about-me" });
 // ! buttons
 const editButton = document.querySelector(".profile__edit-button");
 const addButton = document.querySelector(".profile__add-button");
 // ! popup
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
 //  ! section
 const cardsSection = new Section({ items: cardsArray, renderer: createCard }, ".cards")

 function createCard(cardObj) {
     const card = new Card(cardObj.name, cardObj.link, handleImageClick);
     return card.generateCard();
 }

 function handleImageClick() {
     imagePopup.open();
 }

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

 // ! add form handle
 function handleAddFormSubmit(evt) {
     evt.preventDefault();

     const titleInputText = titleInput.value;
     const imageLinkText = imageLinkInput.value;

     cardsSection.addItem({ name: titleInputText, link: imageLinkText });

     addFormElement.reset();
     addFormValidator.resetValidation()
     toggleAddPopupWindow();
 }

 // * * this function toggles the popup window for the edit window 
 function toggleEditPopupWindow() {
     if (!profilePopup.checkIfOpened()) {
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
     if (!addPopup.checkIfOpened()) {
         addPopup.open();
     } else {
         addPopup.close();
     }
 }

 // ! calling event listeners
 addButton.addEventListener("click", toggleAddPopupWindow);

 editButton.addEventListener("click", toggleEditPopupWindow);