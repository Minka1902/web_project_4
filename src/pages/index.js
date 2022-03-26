 import "./index.css";
 import * as consts from "../utils/constants";
 import PopupConfirm from "../components/PopupConfirm";
 import PopupWithForm from "../components/PopupWithForm";
 import PopupWithImage from "../components/PopupWithImage";
 import FormValidator from "../components/FormValidator";
 import UserInfo from "../components/UserInfo";
 import Section from "../components/Section";
 import Api from "../components/Api";
 import Card from "../components/Card";

 // ! user
 const userInfo = new UserInfo({ name: ".profile__name", job: ".profile__about-me", avatar: ".profile__avatar" });

 // ! popup
 const profilePopup = new PopupWithForm(".popup_profile", handleProfileFormSubmit);
 const confirmPopup = new PopupConfirm(".popup_confirm", ".popup__button");
 const addPopup = new PopupWithForm(".popup_add", handleAddFormSubmit);
 const avatarPopup = new PopupWithForm(".popup_avatar", handleAvatarFormSubmit);
 const imagePopup = new PopupWithImage(".popup_image");

 // ! forms
 const avatarFormValidator = new FormValidator(consts.formSettings, consts.avatarFormElement)
 const addFormValidator = new FormValidator(consts.formSettings, consts.addFormElement);
 const editFormValidator = new FormValidator(consts.formSettings, consts.editFormElement);

 // ! api
 const api = new Api(consts.apiOptions);

 // ! section
 const cardsSection = new Section({ items: consts.cardsData, renderer: createCard }, ".cards", api);

 profilePopup.setEventListeners();
 confirmPopup.setEventListeners();
 addPopup.setEventListeners();
 avatarPopup.setEventListeners();
 imagePopup.setEventListeners();

 avatarFormValidator.enableValidation();
 addFormValidator.enableValidation();
 editFormValidator.enableValidation();

 // ! calling event listeners
 consts.addButton.addEventListener("click", toggleAddPopupWindow);

 consts.editButton.addEventListener("click", toggleEditPopupWindow);

 consts.avatarButton.addEventListener("click", toggleAvatarPopupWindow);

 Promise.all([api.getUserInfo(), api.getInitialCards()])
     .then(([userData, fCards]) => {
         const userObject = {};
         userInfo.createMe(userData);
         userObject.name = userData.name;
         userObject.about = userData.about;
         userObject.avatar = userData.avatar;
         userInfo.setUserInfo(userObject);

         for (let i = 0; i < fCards.length; i++) {
             const len = fCards.length - 1;
             const cardObj = {
                 name: fCards[len - i].name,
                 link: fCards[len - i].link,
                 id: fCards[len - i]._id,
                 likes: fCards[len - i].likes,
                 owner: fCards[len - i].owner
             };
             consts.cardsData[i] = cardObj;
         }
         cardsSection.render();
     }).catch((err) => {
         console.log(err);
     });

 function createCard(cardObj, api) {
     const card = new Card(
         "#cardtemplate",
         cardObj.name,
         cardObj.link,
         cardObj.id,
         cardObj.likes,
         handleImageClick,
         confirmPopup,
         cardObj.owner,
         userInfo);

     return card.generateCard(api);
 }

 // ! image popup handle
 function handleImageClick({ url, caption }) {
     imagePopup.open({ url, caption });
 }

 // ! edit popup and form handling
 // * this function toggles the popup window for the edit window 
 function toggleEditPopupWindow() {
     if (!profilePopup.checkIfOpened()) {
         profilePopup.open();
         const { name, job } = userInfo.getUserInfo()
         consts.nameInput.value = name;
         consts.jobInput.value = job;
     } else {
         profilePopup.close();
     }
 }

 // * edit form handle
 function handleProfileFormSubmit(evt) {
     evt.preventDefault();

     const inVal = profilePopup.getInputValues();
     const userObj = { name: inVal.name, about: inVal.description };

     api.changeUserInfo(consts.nameInput, consts.jobInput)
         .then(() => {
             userInfo.setUserInfo(userObj);
             toggleEditPopupWindow();
         })
         .finally(() => {
             profilePopup.querySelector(".popup__button").textContent = "Save";
         }).catch((err) => {
             console.log(err);
         });
 }

 // ! add popup and form handling
 // * this function toggles the popup window for the add window 
 function toggleAddPopupWindow() {
     if (!addPopup.checkIfOpened()) {
         addPopup.open();
         addFormValidator.toggleButtonState(false);
     } else {
         addPopup.close();
     }
 }


 // * add form handle
 function handleAddFormSubmit(evt) {
     evt.preventDefault();

     const inVal = addPopup.getInputValues();
     api.addCard(inVal.title, inVal.imagelink)
         .then((data) => {
             cardsSection.addItem({
                 name: inVal.title,
                 link: inVal.imagelink,
                 likes: [],
                 owner: userInfo.getMe(),
                 id: data._id
             });
             toggleAddPopupWindow();
         })
         .finally(() => {
             addPopup.querySelector(".popup__button").textContent = "Save";
         }).catch((err) => {
             console.log(err);
         });

 }

 // ! avatar popup and form handling
 // * this function toggles the popup window for the avatar window 
 function toggleAvatarPopupWindow() {
     if (!avatarPopup.checkIfOpened()) {
         avatarPopup.open();
     } else {
         avatarPopup.close();
     }
 }

 // * avatar form handle
 function handleAvatarFormSubmit(evt) {
     evt.preventDefault();

     const inVal = avatarPopup.getInputValues();
     api.changeAvatar(inVal.avatar)
         .then(() => {
             userInfo.setUserUrl(inVal.avatar);
             toggleAvatarPopupWindow();
         })
         .finally(() => {
             avatarPopup.querySelector(".popup__button").textContent = "Save";
         }).catch((err) => {
             console.log(err);
         });
 }