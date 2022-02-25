export default class Section {
    constructor({ items, renderer }, selector) {
        this._renderer = renderer;
        this._items = items;
        this._element = document.querySelector(selector);
    }

    addItem(cardObj) {
        const element = this._renderer(cardObj);
        this._element.prepend(element);
    }

    render() {
        for (let i = 0; i < this._items.length; i++) {
            this.addItem({ name: this._items[i].name, link: this._items[i].link });
        }
    }
}