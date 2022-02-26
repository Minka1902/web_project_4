export default class UserInfo {
    constructor({ name: nameSelector, job: jobSelector }) {
        this._job = document.querySelector(jobSelector);
        this._name = document.querySelector(nameSelector);
    }

    getUserInfo() {
        return { name: this._name.textContent, job: this._job.textContent };
    }

    setUserInfo(userInfo) {
        this._job.textContent = userInfo.job;
        this._name.textContent = userInfo.name;
    }
}