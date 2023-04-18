define(["require", "exports", "knockout", "../../lib/sweetalert2/dist/sweetalert2.all.min", "../models/model_menu"], function (require, exports, ko, Swal, model_menu) {
    "use strict";
    return /** @class */ (function () {
        function class_1() {
            this.getModel_menu = new model_menu();
            this.checkShowModalAddPlaylist = ko.observable(false);
            this.isURL = ko.observable(sessionStorage.getItem("isURL") ? sessionStorage.getItem("isURL") : '#');
            this.sttInputSearch = ko.observable(false);
            this.valueNamePlaylist = ko.observable('');
            this.saved_value = ko.observable('');
            this.itemSongSearchInput = ko.observableArray();
            this.menuMobile = ko.observable(false);
        }
        class_1.prototype.getURL = function (url) {
            if (url == '#profile') {
                if (!sessionStorage.getItem('id_user')) {
                    Swal.fire({
                        title: '<strong>Vui lòng đăng nhập để thực hiện chức năng này!</strong>',
                        icon: 'warning',
                        showCloseButton: true,
                        focusConfirm: false,
                        confirmButtonText: 'Ok!'
                    });
                    return false;
                }
            }
            this.isURL(url);
            sessionStorage.setItem("isURL", url);
            window.location.href = this.isURL();
        };
        class_1.prototype.showModalAddPlaylist = function () {
            if (!sessionStorage.getItem('id_user')) {
                Swal.fire({
                    title: '<strong>Vui lòng đăng nhập để thực hiện chức năng này!</strong>',
                    icon: 'warning',
                    showCloseButton: true,
                    focusConfirm: false,
                    confirmButtonText: 'Ok!'
                });
            }
            else {
                this.checkShowModalAddPlaylist(true);
            }
        };
        class_1.prototype.hiddenModalAddPlaylist = function () {
            this.checkShowModalAddPlaylist(false);
        };
        class_1.prototype.value_changed = function () {
            var _this = this;
            if (this.saved_value() != '') {
                this.getModel_menu.searchSongByName(this.saved_value()).then(function (response) {
                    response = JSON.parse(response);
                    if (response['valueObjItemSearchInput'].length != 0) {
                        _this.itemSongSearchInput(response['valueObjItemSearchInput']);
                    }
                    else {
                        _this.itemSongSearchInput([{ id: 0, name: 'Không có dữ liệu!' }]);
                    }
                    _this.sttInputSearch(true);
                });
            }
            else {
                this.sttInputSearch(false);
            }
        };
        class_1.prototype.addValueInput = function (name, data, e) {
            if (this.saved_value().indexOf('|') == -1) {
                if (name != 'Không có dữ liệu!') {
                    this.saved_value(name + ' | ');
                }
            }
            else {
                if (name != 'Không có dữ liệu!') {
                    this.saved_value(this.saved_value().replace(this.saved_value().slice(this.saved_value().lastIndexOf(' | ')), ' | '));
                    this.saved_value(this.saved_value() + name + ' | ');
                }
            }
            this.sttInputSearch(false);
        };
        class_1.prototype.saveAddPlaylist = function () {
            if (!sessionStorage.getItem('id_user')) {
                Swal.fire({
                    title: '<strong>Vui lòng đăng nhập để thực hiện chức năng này!</strong>',
                    icon: 'warning',
                    showCloseButton: true,
                    focusConfirm: false,
                    confirmButtonText: 'Ok!'
                });
            }
            else {
                this.getModel_menu.addPlaylist(this.valueNamePlaylist(), sessionStorage.getItem('id_user'), this.saved_value()).then(function (response) {
                    if (response == 'success') {
                        Swal.fire({
                            title: '<strong>Thêm danh sách phát thành công!</strong>',
                            icon: 'success',
                            showCloseButton: true,
                            focusConfirm: false,
                            confirmButtonText: 'Ok!'
                        });
                    }
                    else {
                        Swal.fire({
                            title: '<strong>Hệ thống lỗi, xin thử lại sau!</strong>',
                            icon: 'error',
                            showCloseButton: true,
                            focusConfirm: false,
                            confirmButtonText: 'Ok!'
                        });
                    }
                });
            }
        };
        class_1.prototype.setMenuMobile = function () {
            this.menuMobile(!this.menuMobile());
        };
        return class_1;
    }());
});
//# sourceMappingURL=menu.js.map