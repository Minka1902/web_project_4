export default class Section {
    constructor({ items, renderer }, selector, api) {
        this._renderer = renderer;
        this._items = items;
        this._api = api;
        this._element = document.querySelector(selector);
    }

    addItem(item) {
        const element = this._renderer(item, this._api);
        this._element.prepend(element);
    }

    render() {
        for (let i = 0; i < this._items.length; i++) {
            this.addItem(this._items[i]);
        }
    }
}