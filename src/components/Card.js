import PopupWithImage from "./PopupWithImage";

export default class Card {
    constructor(name, link, handleImageClick) {
        this._name = name;
        this._link = link;
        this._handleImageClick = handleImageClick;
    }

    // * * this function generates the card 
    generateCard() {
        this._createCard();
        this._setEventListeners();
        return this._element;
    }

    // * * this function sets all the info of the card
    _createCard() {
        this._element = this._getTemplate();
        const card = this._element;
        const cardImage = card.querySelector(".card__image");
        card.querySelector(".card__text").textContent = this._name;
        cardImage.src = this._link;
        cardImage.alt = `A view of ${ this._name }`;
        return card;
    }

    // * * this function creates all the event listeners
    _getTemplate() {
        const cardElement = document
            .querySelector("#cardtemplate")
            .content
            .querySelector(".card")
            .cloneNode(true);

        return cardElement;
    }

    // * * this function creates all the event listeners
    _setEventListeners = () => {
        this._element.querySelector(".card__like-button").addEventListener("click", () => {
            this._toggleLikeButton();
        });

        this._element.querySelector(".card__delete").addEventListener("click", () => {
            this._deleteCard();
        });

        this._element.querySelector(".card__image").addEventListener("click", () => {
            this._handleImageClick({ url: this._link, caption: this._name });
        });
    }

    // * * this function toggles likes for the cards
    _toggleLikeButton() {
        this._element.querySelector(".card__like-button").classList.toggle("info__card_like-button_state_active");
    }

    // * * this function deletes the card
    _deleteCard() {
        this._element.remove();
    }
};