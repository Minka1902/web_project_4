//{
// 	baseUrl: "https://around.nomoreparties.co/v1/group-12",
// 	headers: {
// 		authorization: "614bb6fa-36a6-4d24-9b95-72bf17bccf61",
// 		Content: "application/json"
// 	}
//}

export default class Api {
    constructor(options) { // header = {authorization: , "Content-Type": }
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }
    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return `Error ${res.status}`;
    }

    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
                method: "GET",
                headers: {
                    authorization: this._headers.authorization
                }
            })
            .then((res) => {
                return this._checkResponse(res)
            })
    }

    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
                method: "GET",
                headers: {
                    authorization: this._headers.authorization
                }
            })
            .then((res) => {
                return this._checkResponse(res);
            })
    }

    addLike(id) {
        return fetch(`${this._baseUrl}/cards/likes/${id}`, {
            method: "PUT",
            headers: {
                authorization: this._headers.authorization,
            }
        }).then((res) => {
            return this._checkResponse(res);
        })
    }

    removeLike(id) {
        return fetch(`${this._baseUrl}/cards/likes/${id}`, {
            method: "DELETE",
            headers: {
                authorization: this._headers.authorization,
            }
        }).then((res) => {
            return this._checkResponse(res);
        })
    }

    addCard(title, imageLink) {
        return fetch(`${this._baseUrl}/cards`, {
                method: "POST",
                headers: {
                    authorization: this._headers.authorization,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: title,
                    link: imageLink
                }),
            })
            .then((res) => {
                return this._checkResponse(res);
            })
    }

    deleteCard(id) {
        return fetch(`${this._baseUrl}/cards/${id}`, {
                method: "DELETE",
                headers: {
                    authorization: this._headers.authorization,
                }
            })
            .then((res) => {
                return this._checkResponse(res);
            })
    }

    changeAvatar(newAvatarSrc) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
                method: "PATCH",
                headers: {
                    authorization: this._headers.authorization,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    avatar: newAvatarSrc,
                })
            })
            .then((res) => {
                return this._checkResponse(res);
            })
    }

    changeUserInfo(nameInput, jobInput) {
        return fetch(`${this._baseUrl}/users/me`, {
                method: "PATCH",
                headers: {
                    authorization: this._headers.authorization,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: nameInput.value,
                    about: jobInput.value
                })
            })
            .then((res) => {
                return this._checkResponse(res);
            })
    }
}