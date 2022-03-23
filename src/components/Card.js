export default class Card {
    constructor(name, link, cardId, likes, handleImageClick, confirmPopup, owner, user) {
        this._name = name;
        this._link = link;
        this._likes = likes;
        this._cardId = cardId;
        this._handleImageClick = handleImageClick;
        this._confirmPopup = confirmPopup;
        this._owner = owner;
        this._user = user;
    }

    // * * this function generates the card 
    generateCard(api) {
        this._createCard();
        this._setEventListeners(api);
        this._toggleLikes();
        return this._element;
    }

    // * * this function sets all the info of the card
    _createCard() {
        this._element = this._getTemplate();
        const card = this._element;
        this._cardImage = card.querySelector(".card__image");
        card.querySelector(".card__text").textContent = this._name;
        this._cardImage.src = this._link;
        this._cardImage.alt = `A view of ${ this._name }`;
        this._likeNumber = this._element.querySelector(".card__like-number");
        this._likeNumber.textContent = this.getLikeNumber();
        return card;
    }

    _setCardLikes() {
        this._likeNumber.textContent = this.getLikeNumber();
    }

    // * * this function creates the card template
    _getTemplate() {
        const cardElement = document
            .querySelector("#cardtemplate")
            .content
            .querySelector(".card")
            .cloneNode(true);
        this._cardDelete = cardElement.querySelector(".card__delete");
        if (this._owner) {
            if (!(this._owner._id === this._user.id)) {
                this._cardDelete.classList.add("card__delete_hidden");
            }
        }
        return cardElement;
    }

    getLikeNumber() {
        if (this._likes) {
            return this._likes.length;
        }
        return 0;
    }

    handleClick = (api) => {
        if (this._owner._id === this._user.id) {
            this._deleteCard();
            if (!this._cardId) {
                api.getCardId()
                    .then((data) => {
                        this._cardId = data[0]._id;
                        api.deleteCard(this._cardId)
                            .then(() => {
                                this._confirmPopup.close(".popup_confirm");
                            }).finally(() => {
                                this._confirmPopup.querySelector(".popup__button").textContent = "Yes";
                            }).catch((err) => {
                                console.log(err);
                            });
                    });
            } else {
                api.deleteCard(this._cardId)
                    .then(() => {
                        this._confirmPopup.close(".popup_confirm");
                    }).finally(() => {
                        this._confirmPopup.querySelector(".popup__button").textContent = "Yes";
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
            this._confirmPopup.querySelector(".popup__button").textContent = "Deleting..."
        }
    }

    // * * this function creates all the event listeners
    _setEventListeners = (api) => {
        this._likeButton = this._element.querySelector(".card__like-button");
        this._likeButton.addEventListener("click", () => {
            if (!this._likeButton.classList.contains("info__card_like-button_state_active")) {
                this._justLiked = true;
            }
            this._checkLikes(api);
        });


        this._cardDelete.addEventListener("click", () => {
            this._confirmPopup.open(this.handleClick, api);
        });

        this._cardImage.addEventListener("click", () => {
            this._handleImageClick({ url: this._link, caption: this._name });
        });
    }

    _isLiked() {
        for (let i = 0; i < this._likes.length; i++) {
            if (this._likes[i]._id === this._user.id) {
                return true;
            }
            return false;
        }
    }

    // * * this function toggles likes for the cards
    _checkLikes(api) {
        if (this._justLiked) {
            if (this._likes) {
                this._likes[this._likes.length] = this._user;
            }
            if (this._cardId) {
                api.addLike(this._cardId)
                    .then(() => {
                        this._likeNumber.textContent = this.getLikeNumber();
                        this._likeButton.classList.add("info__card_like-button_state_active");
                    });
            } else {
                api.getCardId()
                    .then((data) => {
                        this._cardId = data[0]._id;
                        api.addLike(this._cardId)
                            .then(() => {
                                this._likeNumber.textContent = this.getLikeNumber();
                                this._likeButton.classList.add("info__card_like-button_state_active");
                            });
                    }).catch((err) => {
                        console.log(err);
                    });
            }
            this._justLiked = false;
        } else {
            this._likes.pop();
            if (this._cardId) {
                api.removeLike(this._cardId)
                    .then(() => {
                        this._likeNumber.textContent = this.getLikeNumber();
                        this._likeButton.classList.remove("info__card_like-button_state_active");
                    }).catch((err) => {
                        console.log(err);
                    });
            }
        }
        this._setCardLikes();
    }

    _toggleLikes() {
        if (this._likes) {
            for (let i = 0; i < this._likes.length; i++) {
                if (this._likes[i]._id === this._user.id) {
                    this._likeButton.classList.add("info__card_like-button_state_active");
                }
            }
        }
    }

    // * * this function deletes the card
    _deleteCard() {
        this._element.remove();
    }
};