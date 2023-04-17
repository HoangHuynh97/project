import ko = require('knockout');
import $ = require('jquery');
import Swal = require('../../lib/sweetalert2/dist/sweetalert2.all.min');
import global = require('../../assets/js/global');

export = class {
    activate() {
        this.valueSearch.subscribe(v => {
            this.valueSearch_changed();
        });
    };
    setIsSelected = ko.observable(false);
    checkShowModalUpload = ko.observable(false);
    isLogin = ko.observable(sessionStorage.getItem("name_user") ? true : false);
    isUser = ko.observable(sessionStorage.getItem("name_user") ? sessionStorage.getItem("name_user").charAt(0) : '');

    isLogout() {
        sessionStorage.removeItem("id_user");
        sessionStorage.removeItem("name_user");
        this.isLogin(false);
        this.isUser('');
    }

    showModalUpload() {
        this.checkShowModalUpload(true);
    }
    hiddenModalUpload() {
        this.checkShowModalUpload(false);
    }

    fileImage = ko.observable();
    data = new FormData();
    uploadImage(file) {
        this.data.append('image', file);
        this.fileImage(file);
    }

    valueNameSong = ko.observable('');
    valueSinger = ko.observable('');
    valueIDGG = ko.observable('');
    saveUploadSong() {
        if (this.valueNameSong() == '' || this.valueSinger() == '' || this.valueIDGG() == '' || !this.fileImage()) {
            Swal.fire({
                title: '<strong>Vui lòng nhập đầy đủ thông tin!</strong>',
                icon: 'warning',
                showCloseButton: true,
                focusConfirm: false,
                confirmButtonText: 'Ok!'
            });
        } else {
            this.data.append('song', this.valueNameSong());
            this.data.append('singer', this.valueSinger());
            this.data.append('gg', this.valueIDGG());
            fetch(global.api_url + 'upload_song', {
                method: 'POST',
                body: this.data
            }).then((response) => {
                return response.json();
            }).then((dataRes) => {
                if (dataRes.message == 'fail') {
                    Swal.fire({
                        title: '<strong>Hệ thống xảy ra lỗi, vui lòng thử lại sau!</strong>',
                        icon: 'error',
                        showCloseButton: true,
                        focusConfirm: false,
                        confirmButtonText: 'Ok!'
                    });
                } else {
                    Swal.fire({
                        title: '<strong>Thêm bài hát mới thành công!</strong>',
                        icon: 'success',
                        showCloseButton: true,
                        focusConfirm: false,
                        confirmButtonText: 'Ok!'
                    });
                    this.checkShowModalUpload(false);
                }
            });
        }
    }

    valueSearch = ko.observable('');
    setArrSongSearch = ko.observableArray();
    setArrSingerSearch = ko.observableArray();
    setArrSongMainSearch = ko.observableArray();
    setIsSearch = ko.observable(false);
    valueSearch_changed() {
        if (this.valueSearch() != '') {
            fetch(global.api_url + 'search_song', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ key_search: this.valueSearch() })
            }).then((response) => {
                return response.json();
            }).then((data) => {
                if (data.length == 0) {
                    this.setIsSearch(false);
                    this.setArrSongSearch([]);
                    this.setArrSingerSearch([]);
                    this.setArrSongMainSearch([]);
                } else {
                    this.setIsSearch(true);
                    var itemSongSearch = [];
                    data.dataSongSearch.map(function (value) {
                        itemSongSearch.push({ name: value.name, id_gg: value.id_gg, image: value.image, date_create: value.date_create, id_singer: value.id_singer, text_gr_singer: value.text_gr_singer });
                    });
                    this.setArrSongSearch(itemSongSearch);

                    if (data.dataSingerSearch) {
                        var itemSingerSearch = [];
                        data.dataSingerSearch.map(function (value) {
                            itemSingerSearch.push({ name: value.name, id: value.id });
                        });
                        this.setArrSingerSearch(itemSingerSearch);
                    } else {
                        this.setArrSingerSearch([]);
                    }

                    var itemSongMainSearch = [];
                    data.dataSongMainSearch.map(function (value) {
                        itemSongMainSearch.push({ name: value.name, id_gg: value.id_gg, image: value.image, date_create: value.date_create, id_singer: value.id_singer, text_gr_singer: value.text_gr_singer });
                    });
                    this.setArrSongMainSearch(itemSongMainSearch);
                }
            });
        } else {
            this.setIsSearch(false);
            this.setArrSongSearch([]);
            this.setArrSingerSearch([]);
            this.setArrSongMainSearch([]);
        }
    }

    changeLinkModal(id_gg, singer, nameSong, imgSong) {
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
    }
}