export default class UserInfo {
    constructor({ name, job }) {
        this._job = job;
        this._name = name;
    }

    getUserInfo() {
        return { name: this._name, job: this._job };
    }

    setUserInfo(obj) {
        this._job = obj.job;
        this._name = obj.name;
    }
}