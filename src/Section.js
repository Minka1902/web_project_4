export default class Section {
    constructor({ items, renderer }, classSelector) {
        this._renderer = renderer;
        this._items = items;
        this._classSelector = classSelector;
        this._element = this;
    }

    addItem(element) {
        document.querySelector(`.${this._classSelector}`).append(element);
    }

    render() {
        this._renderer(this._items);
    }
}