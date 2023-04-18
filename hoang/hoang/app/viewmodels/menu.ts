import ko = require('knockout');
import $ = require('jquery');
import Swal = require('../../lib/sweetalert2/dist/sweetalert2.all.min');
import global = require('../../assets/js/global');
import model_menu = require('../models/model_menu');

export = class {
    getModel_menu = new model_menu();
    checkShowModalAddPlaylist = ko.observable(false);
    isURL = ko.observable(sessionStorage.getItem("isURL") ? sessionStorage.getItem("isURL") : '#');
    getURL(url) {
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
    }
    showModalAddPlaylist() {
        if (!sessionStorage.getItem('id_user')) {
            Swal.fire({
                title: '<strong>Vui lòng đăng nhập để thực hiện chức năng này!</strong>',
                icon: 'warning',
                showCloseButton: true,
                focusConfirm: false,
                confirmButtonText: 'Ok!'
            });
        } else {
            this.checkShowModalAddPlaylist(true);
        }
    }
    hiddenModalAddPlaylist() {
        this.checkShowModalAddPlaylist(false);
    }
    sttInputSearch = ko.observable(false);
    valueNamePlaylist = ko.observable('');
    saved_value = ko.observable('');
    itemSongSearchInput = ko.observableArray();
    value_changed() {
        if (this.saved_value() != '') {
            this.getModel_menu.searchSongByName(this.saved_value()).then((response) => {
                response = JSON.parse(response);
                if (response['valueObjItemSearchInput'].length != 0) {
                    this.itemSongSearchInput(response['valueObjItemSearchInput']);
                } else {
                    this.itemSongSearchInput([{ id: 0, name: 'Không có dữ liệu!' }]);
                }
                this.sttInputSearch(true);
            });
        } else {
            this.sttInputSearch(false);
        }
    }
    addValueInput(name, data, e) {
        if (this.saved_value().indexOf('|') == -1) {
            if (name != 'Không có dữ liệu!') {
                this.saved_value(name + ' | ');
            }
        } else {
            if (name != 'Không có dữ liệu!') {
                this.saved_value(this.saved_value().replace(this.saved_value().slice(this.saved_value().lastIndexOf(' | ')), ' | '));
                this.saved_value(this.saved_value() + name + ' | ');
            }
        }
        this.sttInputSearch(false);
    }
    saveAddPlaylist() {
        if (!sessionStorage.getItem('id_user')) {
            Swal.fire({
                title: '<strong>Vui lòng đăng nhập để thực hiện chức năng này!</strong>',
                icon: 'warning',
                showCloseButton: true,
                focusConfirm: false,
                confirmButtonText: 'Ok!'
            });
        } else {
            this.getModel_menu.addPlaylist(this.valueNamePlaylist(), sessionStorage.getItem('id_user'), this.saved_value()).then((response) => {
                if (response == 'success') {
                    Swal.fire({
                        title: '<strong>Thêm danh sách phát thành công!</strong>',
                        icon: 'success',
                        showCloseButton: true,
                        focusConfirm: false,
                        confirmButtonText: 'Ok!'
                    });
                } else {
                    Swal.fire({
                        title: '<strong>Hệ thống lỗi, xin thử lại sau!</strong>',
                        icon: 'error',
                        showCloseButton: true,
                        focusConfirm: false,
                        confirmButtonText: 'Ok!'
                    });
                }
            })
        }
    }
    menuMobile = ko.observable(false);
    setMenuMobile() {
        this.menuMobile(!this.menuMobile());
    }
}