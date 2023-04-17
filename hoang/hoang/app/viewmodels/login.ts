import ko = require('knockout');
import Swal = require('../../lib/sweetalert2/dist/sweetalert2.all.min');
import global = require('../../assets/js/global');
import model_login = require('../models/model_login');

export = class {
    getModel_login = new model_login();
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
            this.getModel_login.checkLogin(this.valueUser(), this.valuePass()).then((response) => {
                if (response == 'fail') {
                    Swal.fire({
                        icon: 'error',
                        title: 'Sai tài khoản hoặc mật khẩu',
                        text: 'Vui lòng kiểm tra lại Username/Password!'
                    });
                } else {
                    response = JSON.parse(response);
                    sessionStorage.setItem("id_user", response['valueID_user']);
                    sessionStorage.setItem("name_user", response['valueName_user']);
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
                this.getModel_login.getSignUP(this.valueUserSignUP(), this.valuePassSignUP(), this.valueUserFullname()).then((response) => {
                    if (response == 'exists') {
                        Swal.fire({
                            icon: 'error',
                            title: 'Tài khoản đã tồn tại!',
                            text: 'Vui lòng thử lại sau!'
                        });
                    } else if (response == 'fail') {
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
}

$(document).ready(function () {
    if (sessionStorage.getItem("name_user")) {
        window.location.href = '#';
    }
});