export class Card {
    constructor(name, link, openPopup) {
        this._name = name;
        this._link = link;
        this._openPopup = openPopup;
        this._element = this._getTemplate();
    }

    // * * this function generates the card 
    generateCard() {
        this._setEventListeners();
        this._setCard();

        return this._element;
    }

    // * * this function sets all the info of the card
    _setCard() {
        const card = this._element;
        const cardImage = card.querySelector(".card__image");
        card.querySelector(".card__text").textContent = this._name;
        cardImage.src = this._link;
        cardImage.alt = `A view of ${this._name}`;
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
    _setEventListeners() {
        this._element.querySelector(".card__like-button").addEventListener("click", () => {
            this._toggleLikeButton();
        });

        this._element.querySelector(".card__delete").addEventListener("click", () => {
            this._deleteCard();
        });

        this._element.querySelector(".card__image").addEventListener("click", (evt) => {
            this._openImagePopup(evt);
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

    _openImagePopup(evt) {
        document.querySelector(".popup__image").setAttribute("src", evt.currentTarget.src);
        document.querySelector(".popup__image").setAttribute("alt", evt.currentTarget.alt);
        document.querySelector(".popup__text").textContent = evt.currentTarget.parentElement.textContent;
        this._openPopup(document.querySelector(".popup_image"));
    }
};