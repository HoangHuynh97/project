define(["require", "exports", "knockout", "../../lib/sweetalert2/dist/sweetalert2.all.min"], function (require, exports, ko, Swal) {
    "use strict";
    $(document).ready(function () {
        if (sessionStorage.getItem("name_user")) {
            window.location.href = '#';
        }
    });
    return /** @class */ (function () {
        function class_1() {
            var _this = this;
            this.valueUser = ko.observable('');
            this.valuePass = ko.observable('');
            this.keypress = window.addEventListener('keypress', function (e) {
                if (e.key === 'Enter') {
                    _this.checkLogin();
                }
            });
        }
        class_1.prototype.checkLogin = function () {
            if (this.valueUser() == '' || this.valuePass() == '') {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Vui lòng nhập đầy đủ thông tin!'
                });
            }
            else {
                fetch('http://localhost:8080/music/api_login', {
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
        return class_1;
    }());
});
//# sourceMappingURL=login.js.map