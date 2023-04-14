import ko = require('knockout');
import Swal = require('../../lib/sweetalert2/dist/sweetalert2.all.min');
import global = require('../../assets/js/global');

export = class {

    valueUser = ko.observable('');
    valuePass = ko.observable('');

    valueUserSignUP = ko.observable('');
    valuePassSignUP = ko.observable('');
    valuePassSignUPCheck = ko.observable('');
    valueUserFullname = ko.observable('');

    isShowSignUP = ko.observable(false);
    isShowLogin = ko.observable(true);

    signUP() {
        this.isShowSignUP(true);
        this.isShowLogin(false);
    }
    logIN() {
        this.isShowSignUP(false);
        this.isShowLogin(true);
    }

    checkLogin() {
        if (this.valueUser() == '' || this.valuePass() == '') {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Vui lòng nhập đầy đủ thông tin!'
            });
        } else {
            fetch(global.api_url + 'api_login', {
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

    getSignUP() {
        if (this.valueUserSignUP() == '' || this.valuePassSignUP() == '' || this.valuePassSignUPCheck() == '' || this.valueUserFullname() == '') {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Vui lòng nhập đầy đủ thông tin!'
            });
        } else {
            if (this.valuePassSignUP() != this.valuePassSignUPCheck()) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Vui lòng kiểm tra lại mật khẩu!'
                });
            } else {
                fetch(global.api_url + 'api_signup', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json, text/plain, */*',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ inputUser: this.valueUserSignUP(), inputPw: this.valuePassSignUP(), inputName: this.valueUserFullname() })
                }).then((response) => {
                    return response.json();
                }).then((data) => {
                    if (data.message == 'exists') {
                        Swal.fire({
                            icon: 'error',
                            title: 'Tài khoản đã tồn tại!',
                            text: 'Vui lòng thử lại sau!'
                        });
                    } else if (data.message == 'fail') {
                        Swal.fire({
                            icon: 'error',
                            title: 'Hệ thống xảy ra lỗi',
                            text: 'Vui lòng thử lại sau!'
                        });
                    } else {
                        Swal.fire({
                            icon: 'success',
                            title: 'Đăng ký thành công!',
                            text: 'Trở về trang đăng nhập!'
                        });
                        this.logIN();
                    }
                });
            }
        }
    }
/*
    keypress = window.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && this.isShowLogin) {
            this.checkLogin();
        } else if (e.key === 'Enter' && this.isShowSignUP) {
            this.getSignUP();
        }
    });*/
}

$(document).ready(function () {
    if (sessionStorage.getItem("name_user")) {
        window.location.href = '#';
    }
});