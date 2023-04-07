import ko = require('knockout');
import Swal = require('../../lib/sweetalert2/dist/sweetalert2.all.min');

export = class {

    valueUser = ko.observable('');
    valuePass = ko.observable('');

    checkLogin() {
        if (this.valueUser() == '' || this.valuePass() == '') {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Vui lòng nhập đầy đủ thông tin!'
            });
        } else {
            fetch('http://localhost:8080/music/api_login', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ inputUser: this.valueUser(), inputPw: this.valuePass() })
            }).then((response) => {
                return response.json();
            }).then((data) => {
                if (data.message == 'fail') {
                    Swal.fire({
                        icon: 'error',
                        title: 'Sai tài khoản hoặc mật khẩu',
                        text: 'Vui lòng kiểm tra lại Username/Password!'
                    });
                } else {
                    sessionStorage.setItem("id_user", data.id_user);
                    sessionStorage.setItem("name_user", data.name_user);
                    window.location.reload();
                }
            });
        }
    }

    keypress = window.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            this.checkLogin();
        }
    });
}

$(document).ready(function () {
    if (sessionStorage.getItem("name_user")) {
        window.location.href = '#';
    }
});