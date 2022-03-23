 import "./index.css";
 import * as consts from "../utils/constants";

 consts.profilePopup.setEventListeners();
 consts.confirmPopup.setEventListeners();
 consts.addPopup.setEventListeners();
 consts.avatarPopup.setEventListeners();
 consts.imagePopup.setEventListeners();

 consts.avatarFormValidator.enableValidation();
 consts.addFormValidator.enableValidation();
 consts.editFormValidator.enableValidation();

 // ! calling event listeners
 consts.addButton.addEventListener("click", consts.toggleAddPopupWindow);

 consts.editButton.addEventListener("click", consts.toggleEditPopupWindow);

 consts.avatarButton.addEventListener("click", consts.toggleAvatarPopupWindow);

 Promise.all([consts.api.getUserInfo(), consts.api.getInitialCards()])
     .then(([userData, fCards]) => {
         const userObject = {};
         consts.userInfo.createMe(userData);
         userObject.name = userData.name;
         userObject.about = userData.about;
         userObject.avatar = userData.avatar;
         consts.userInfo.setUserInfo(userObject);

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
         consts.cardsSection.render();
     }).catch((err) => {
         console.log(err);
     });