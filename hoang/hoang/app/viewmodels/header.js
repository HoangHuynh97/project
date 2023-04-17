define(["require", "exports", "knockout", "../../lib/sweetalert2/dist/sweetalert2.all.min", "../../assets/js/global"], function (require, exports, ko, Swal, global) {
    "use strict";
    return /** @class */ (function () {
        function class_1() {
            this.setIsSelected = ko.observable(false);
            this.checkShowModalUpload = ko.observable(false);
            this.isLogin = ko.observable(sessionStorage.getItem("name_user") ? true : false);
            this.isUser = ko.observable(sessionStorage.getItem("name_user") ? sessionStorage.getItem("name_user").charAt(0) : '');
            this.fileImage = ko.observable();
            this.data = new FormData();
            this.valueNameSong = ko.observable('');
            this.valueSinger = ko.observable('');
            this.valueIDGG = ko.observable('');
            this.valueSearch = ko.observable('');
            this.setArrSongSearch = ko.observableArray();
            this.setArrSingerSearch = ko.observableArray();
            this.setArrSongMainSearch = ko.observableArray();
            this.setIsSearch = ko.observable(false);
        }
        class_1.prototype.activate = function () {
            var _this = this;
            this.valueSearch.subscribe(function (v) {
                _this.valueSearch_changed();
            });
        };
        ;
        class_1.prototype.isLogout = function () {
            sessionStorage.removeItem("id_user");
            sessionStorage.removeItem("name_user");
            this.isLogin(false);
            this.isUser('');
        };
        class_1.prototype.showModalUpload = function () {
            this.checkShowModalUpload(true);
        };
        class_1.prototype.hiddenModalUpload = function () {
            this.checkShowModalUpload(false);
        };
        class_1.prototype.uploadImage = function (file) {
            this.data.append('image', file);
            this.fileImage(file);
        };
        class_1.prototype.saveUploadSong = function () {
            var _this = this;
            if (this.valueNameSong() == '' || this.valueSinger() == '' || this.valueIDGG() == '' || !this.fileImage()) {
                Swal.fire({
                    title: '<strong>Vui lòng nhập đầy đủ thông tin!</strong>',
                    icon: 'warning',
                    showCloseButton: true,
                    focusConfirm: false,
                    confirmButtonText: 'Ok!'
                });
            }
            else {
                this.data.append('song', this.valueNameSong());
                this.data.append('singer', this.valueSinger());
                this.data.append('gg', this.valueIDGG());
                fetch(global.api_url + 'upload_song', {
                    method: 'POST',
                    body: this.data
                }).then(function (response) {
                    return response.json();
                }).then(function (dataRes) {
                    if (dataRes.message == 'fail') {
                        Swal.fire({
                            title: '<strong>Hệ thống xảy ra lỗi, vui lòng thử lại sau!</strong>',
                            icon: 'error',
                            showCloseButton: true,
                            focusConfirm: false,
                            confirmButtonText: 'Ok!'
                        });
                    }
                    else {
                        Swal.fire({
                            title: '<strong>Thêm bài hát mới thành công!</strong>',
                            icon: 'success',
                            showCloseButton: true,
                            focusConfirm: false,
                            confirmButtonText: 'Ok!'
                        });
                        _this.checkShowModalUpload(false);
                    }
                });
            }
        };
        class_1.prototype.valueSearch_changed = function () {
            var _this = this;
            if (this.valueSearch() != '') {
                fetch(global.api_url + 'search_song', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json, text/plain, */*',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ key_search: this.valueSearch() })
                }).then(function (response) {
                    return response.json();
                }).then(function (data) {
                    if (data.length == 0) {
                        _this.setIsSearch(false);
                        _this.setArrSongSearch([]);
                        _this.setArrSingerSearch([]);
                        _this.setArrSongMainSearch([]);
                    }
                    else {
                        _this.setIsSearch(true);
                        var itemSongSearch = [];
                        data.dataSongSearch.map(function (value) {
                            itemSongSearch.push({ name: value.name, id_gg: value.id_gg, image: value.image, date_create: value.date_create, id_singer: value.id_singer, text_gr_singer: value.text_gr_singer });
                        });
                        _this.setArrSongSearch(itemSongSearch);
                        if (data.dataSingerSearch) {
                            var itemSingerSearch = [];
                            data.dataSingerSearch.map(function (value) {
                                itemSingerSearch.push({ name: value.name, id: value.id });
                            });
                            _this.setArrSingerSearch(itemSingerSearch);
                        }
                        else {
                            _this.setArrSingerSearch([]);
                        }
                        var itemSongMainSearch = [];
                        data.dataSongMainSearch.map(function (value) {
                            itemSongMainSearch.push({ name: value.name, id_gg: value.id_gg, image: value.image, date_create: value.date_create, id_singer: value.id_singer, text_gr_singer: value.text_gr_singer });
                        });
                        _this.setArrSongMainSearch(itemSongMainSearch);
                    }
                });
            }
            else {
                this.setIsSearch(false);
                this.setArrSongSearch([]);
                this.setArrSingerSearch([]);
                this.setArrSongMainSearch([]);
            }
        };
        class_1.prototype.changeLinkModal = function (id_gg, singer, nameSong, imgSong) {
            if (sessionStorage.getItem("url_song") != '') {
                sessionStorage.removeItem("url_song");
                sessionStorage.removeItem("id_gg");
                sessionStorage.removeItem("name_singer");
                sessionStorage.removeItem("name_song");
                sessionStorage.removeItem("img_song");
            }
            sessionStorage.setItem("url_song", 'https://docs.google.com/uc?export=download&id=' + id_gg);
            sessionStorage.setItem("id_gg", id_gg);
            sessionStorage.setItem("name_singer", singer);
            sessionStorage.setItem("name_song", nameSong);
            sessionStorage.setItem("img_song", imgSong);
            window.dispatchEvent(new Event("storage"));
        };
        return class_1;
    }());
});
//# sourceMappingURL=header.js.map