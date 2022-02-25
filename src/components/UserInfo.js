export default class UserInfo {
    constructor(obj) {
        this._job = document.querySelector(obj.job);
        this._name = document.querySelector(obj.name);
    }

    getUserInfo() {
        return { name: this._name.textContent, job: this._job.textContent };
    }

    setUserInfo(obj) {
        this._job.textContent = obj.job;
        this._name.textContent = obj.name;
    }
}