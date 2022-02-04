 import { Card } from "./Card.js";
 import { FormValidator } from "./FormValidator.js";
 import * as functions from "./utils.js"

 // ! buttons
 const editButton = document.querySelector(".profile__edit-button");
 const addButton = document.querySelector(".profile__add-button");
 // ! popup
 const profilePopup = document.querySelector(".popup_profile");
 const imagePopup = document.querySelector(".popup_image");
 const addPopup = document.querySelector(".popup_add");
 // ! close buttons
 const addCloseButton = document.getElementById("addCloseButton");
 const imageCloseButton = document.querySelector(".popup__close-button_image");
 const editCloseButton = document.getElementById("editCloseButton");
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
     for (let i = 0; i < cardsArray.length; i++) {
         const card = new Card(cardsArray[i].name, cardsArray[i].link, functions.openPopup);
         cards.prepend(card.generateCard());
     }
 }

 createCards();
 addFormValidator.enableValidation();
 editFormValidator.enableValidation();

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

     const card = new Card(titleInputText, imageLinkText, functions.openPopup);
     cards.prepend(card.generateCard());

     addFormElement.reset();
     addFormValidator.toggleButtonState(addPopup.querySelector(".popup__button"), false);
     toggleAddPopupWindow();
 }

 // * * this function toggles the popup window for the edit window 
 function toggleEditPopupWindow() {
     if (!profilePopup.classList.contains("popup_opened")) {
         functions.openPopup(profilePopup);
         nameInput.value = profileName.textContent;
         jobInput.value = profileAboutMe.textContent;
     } else {
         functions.closePopup(profilePopup);
     }
 }

 // * * this function toggles the popup window for the add window 
 function toggleAddPopupWindow() {
     if (!addPopup.classList.contains("popup_opened")) {
         addFormElement.reset();
         functions.openPopup(addPopup);
     } else {
         functions.closePopup(addPopup);
     }
 }

 // ! calling event listeners
 addFormElement.addEventListener("submit", handleAddFormSubmit);

 editFormElement.addEventListener("submit", handleProfileFormSubmit);

 editCloseButton.addEventListener("click", toggleEditPopupWindow);

 addCloseButton.addEventListener("click", toggleAddPopupWindow);

 editButton.addEventListener("click", toggleEditPopupWindow);

 addButton.addEventListener("click", toggleAddPopupWindow);

 imageCloseButton.addEventListener("click", () => functions.closePopup(imagePopup));

 // * * once you click your mouse on the popup overlay
 // * * this checks if you press the overlay or the popup content
 popupArray.forEach((popupElement) => {
     popupElement.addEventListener("mousedown", function(evt) {
         if (evt.target.classList.contains("popup")) {
             functions.closePopup(popupElement);
         }
     });
 });