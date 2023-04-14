define(["require", "exports", "knockout", "../../lib/sweetalert2/dist/sweetalert2.all.min", "../../assets/js/global"], function (require, exports, ko, Swal, global) {
    "use strict";
    $(document).ready(function () {
        if (sessionStorage.getItem("name_user")) {
            window.location.href = '#';
        }
    });
    return /** @class */ (function () {
        function class_1() {
            this.valueUser = ko.observable('');
            this.valuePass = ko.observable('');
            this.valueUserSignUP = ko.observable('');
            this.valuePassSignUP = ko.observable('');
            this.valuePassSignUPCheck = ko.observable('');
            this.valueUserFullname = ko.observable('');
            this.isShowSignUP = ko.observable(false);
            this.isShowLogin = ko.observable(true);
            /*
                keypress = window.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter' && this.isShowLogin) {
                        this.checkLogin();
                    } else if (e.key === 'Enter' && this.isShowSignUP) {
                        this.getSignUP();
                    }
                });*/
        }
        class_1.prototype.signUP = function () {
            this.isShowSignUP(true);
            this.isShowLogin(false);
        };
        class_1.prototype.logIN = function () {
            this.isShowSignUP(false);
            this.isShowLogin(true);
        };
        class_1.prototype.checkLogin = function () {
            if (this.valueUser() == '' || this.valuePass() == '') {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Vui lòng nhập đầy đủ thông tin!'
                });
            }
            else {
                fetch(global.api_url + 'api_login', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json, text/plain, */*',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ inputUser: this.valueUser(), inputPw: this.valuePass() })
                }).then(function (response) {
                    return response.json();
                }).then(function (data) {
                    if (data.message == 'fail') {
                        Swal.fire({
                            icon: 'error',
                            title: 'Sai tài khoản hoặc mật khẩu',
                            text: 'Vui lòng kiểm tra lại Username/Password!'
                        });
                    }
                    else {
                        sessionStorage.setItem("id_user", data.id_user);
                        sessionStorage.setItem("name_user", data.name_user);
                        window.location.reload();
                    }
                });
            }
        };
        class_1.prototype.getSignUP = function () {
            var _this = this;
            if (this.valueUserSignUP() == '' || this.valuePassSignUP() == '' || this.valuePassSignUPCheck() == '' || this.valueUserFullname() == '') {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Vui lòng nhập đầy đủ thông tin!'
                });
            }
            else {
                if (this.valuePassSignUP() != this.valuePassSignUPCheck()) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Vui lòng kiểm tra lại mật khẩu!'
                    });
                }
                else {
                    fetch(global.api_url + 'api_signup', {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json, text/plain, */*',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ inputUser: this.valueUserSignUP(), inputPw: this.valuePassSignUP(), inputName: this.valueUserFullname() })
                    }).then(function (response) {
                        return response.json();
                    }).then(function (data) {
                        if (data.message == 'exists') {
                            Swal.fire({
                                icon: 'error',
                                title: 'Tài khoản đã tồn tại!',
                                text: 'Vui lòng thử lại sau!'
                            });
                        }
                        else if (data.message == 'fail') {
                            Swal.fire({
                                icon: 'error',
                                title: 'Hệ thống xảy ra lỗi',
                                text: 'Vui lòng thử lại sau!'
                            });
                        }
                        else {
                            Swal.fire({
                                icon: 'success',
                                title: 'Đăng ký thành công!',
                                text: 'Trở về trang đăng nhập!'
                            });
                            _this.logIN();
                        }
                    });
                }
            }
        };
        return class_1;
    }());
});
//# sourceMappingURL=login.js.map