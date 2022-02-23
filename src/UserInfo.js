export default class UserInfo {
    constructor({ name, job }) {
        this._job = job;
        this._name = name;
        this._element = { name, job };
    }

    getUserInfo() {
        return this._element;
    }

    setUserInfo(obj) {
        this._job = obj.job;
        this._name = obj.name;
    }
}