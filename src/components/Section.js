export default class Section {
    constructor({ items, renderer }, selector) {
        this._renderer = renderer;
        this._items = items;
        this._element = document.querySelector(`.${selector}`);
    }

    addItem(element) {
        this._element.append(element);
    }

    render() {
        this._renderer(this._items);
    }
}