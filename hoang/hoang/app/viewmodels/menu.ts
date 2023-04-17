import ko = require('knockout');
import $ = require('jquery');
import Swal = require('../../lib/sweetalert2/dist/sweetalert2.all.min');
import global = require('../../assets/js/global');

export = class {
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
            fetch(global.api_url + 'search_song_byName', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ key_search: this.saved_value() })
            }).then((response) => {
                return response.json();
            }).then((data) => {
                if (data.dataSongSearch) {
                    var objItemSearchInput = [];
                    data.dataSongSearch.map(function (value) {
                        objItemSearchInput.push({ id: value.id, name: value.name });
                    });
                    this.itemSongSearchInput(objItemSearchInput);
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
            fetch(global.api_url + 'add_playlist', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: this.valueNamePlaylist(), id_user_create: sessionStorage.getItem('id_user'), value_song: this.saved_value() })
            }).then((response) => {
                return response.json();
            }).then((data) => {
                if (data.message == 'success') {
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
            });
        }
    }

    menuMobile = ko.observable(false);
    setMenuMobile() {
        this.menuMobile(!this.menuMobile());
    }
}