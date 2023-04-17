define(["require", "exports", "knockout", "../../lib/sweetalert2/dist/sweetalert2.all.min", "../models/model_login"], function (require, exports, ko, Swal, model_login) {
    "use strict";
    $(document).ready(function () {
        if (sessionStorage.getItem("name_user")) {
            window.location.href = '#';
        }
    });
    return /** @class */ (function () {
        function class_1() {
            this.getModel_login = new model_login();
            this.valueUser = ko.observable('');
            this.valuePass = ko.observable('');
            this.valueUserSignUP = ko.observable('');
            this.valuePassSignUP = ko.observable('');
            this.valuePassSignUPCheck = ko.observable('');
            this.valueUserFullname = ko.observable('');
            this.isShowSignUP = ko.observable(false);
            this.isShowLogin = ko.observable(true);
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
                this.getModel_login.checkLogin(this.valueUser(), this.valuePass()).then(function (response) {
                    if (response == 'fail') {
                        Swal.fire({
                            icon: 'error',
                            title: 'Sai tài khoản hoặc mật khẩu',
                            text: 'Vui lòng kiểm tra lại Username/Password!'
                        });
                    }
                    else {
                        response = JSON.parse(response);
                        sessionStorage.setItem("id_user", response['valueID_user']);
                        sessionStorage.setItem("name_user", response['valueName_user']);
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
                    this.getModel_login.getSignUP(this.valueUserSignUP(), this.valuePassSignUP(), this.valueUserFullname()).then(function (response) {
                        if (response == 'exists') {
                            Swal.fire({
                                icon: 'error',
                                title: 'Tài khoản đã tồn tại!',
                                text: 'Vui lòng thử lại sau!'
                            });
                        }
                        else if (response == 'fail') {
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