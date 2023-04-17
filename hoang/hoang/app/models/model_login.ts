import global = require('../../assets/js/global');

export = class model_login {
    async checkLogin(inputUser, inputPw) {
        return fetch(`${global.api_url}api_login`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ inputUser: inputUser, inputPw: inputPw })
        }).then((response) => {
            return response.json();
        }).then((data) => {
            if (data.message == 'fail') {
                return "fail";
            } else {
                return JSON.stringify({
                    valueID_user: data.id_user,
                    valueName_user: data.name_user
                });
            }
        });
    }

    async getSignUP(inputUser, inputPw, inputName) {
        return fetch(`${global.api_url}api_signup`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ inputUser: inputUser, inputPw: inputPw, inputName: inputName })
        }).then((response) => {
            return response.json();
        }).then((data) => {
            if (data.message == 'exists') {
                return "exists";
            } else if (data.message == 'fail') {
                return "fail";
            } else {
                return "success";
            }
        });
    }
}
