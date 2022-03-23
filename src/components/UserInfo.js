export default class UserInfo {
    constructor({ name: nameSelector, job: aboutSelector, avatar: avatarSelector }) {
        this._about = document.querySelector(aboutSelector);
        this._name = document.querySelector(nameSelector);
        this._avatar = document.querySelector(avatarSelector);
    }

    getUserInfo() {
        return { name: this._name.textContent, job: this._about.textContent, avatar: this._avatar.src };
    }

    createMe(dataObj) {
        this.me = dataObj;
        this.id = dataObj._id;
    }

    getMe() {
        return this.me;
    }

    setUserInfo(userInfo) {
        this._about.textContent = userInfo.about;
        this._name.textContent = userInfo.name;
        if (userInfo.avatar) {
            this._avatar.src = userInfo.avatar;
        }
    }

    setUserUrl(avatarUrl) {
        this._avatar.src = avatarUrl;
    }
}