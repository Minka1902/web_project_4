import Popup from "./Popup";

export default class PopupWithImage extends Popup {
    constructor(popupSelector, url, caption) {
        super(popupSelector);
        this._url = url;
        this._caption = caption;
        this._image = this.getElement().querySelector(".popup__image");
    }

    setImage({ caption, url }) {
        this._url = url;
        this._caption = caption;
    }

    open = () => {
        super.open();
        this._image.setAttribute("src", this._url);
        this._image.setAttribute("alt", this._caption);
        this.getElement().querySelector(".popup__text").textContent = this._caption;
    }
}