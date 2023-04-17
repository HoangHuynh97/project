import ko = require('knockout');
import $ = require('jquery');
import Swal = require('../../lib/sweetalert2/dist/sweetalert2.all.min');
import global = require('../../assets/js/global');
import model_profile = require('../models/model_profile');
import model_home = require('../models/model_home');

export = class {
    getModel_profile = new model_profile();
    getModel_home = new model_home();
    hiddenLoading = ko.observable(false);
    itemSong = ko.observableArray();
    itemSongLike = ko.observableArray();
    itemSongLikePlaylist = ko.observableArray();
    isTab = ko.observable(1);

    changeViewTab(data, key) {
        if (data == 1) {
            this.isTab(1);
        } else if (data == 2) {
            this.isTab(2);
        } else if (data == 3) {
            this.isTab(3);
        }
    }

    getData = this.getModel_profile.getDataSong(sessionStorage.getItem('id_user') ? sessionStorage.getItem('id_user') : 0).then((response) => {
        response = JSON.parse(response);
        this.itemSong(response['valueObjItemNew']);
        this.itemSongLike(response['valueObjItemLike']);
        this.itemSongLikePlaylist(response['valueObjItemLikePlaylist']);
        setTimeout(() => {
            this.hiddenLoading(true);
        }, 1500);
    });

    addHeart(data, id_song, event) {
        if (!sessionStorage.getItem('id_user')) {
            Swal.fire({
                title: '<strong>Vui lòng đăng nhập để thực hiện chức năng này!</strong>',
                icon: 'warning',
                showCloseButton: true,
                focusConfirm: false,
                confirmButtonText: 'Ok!'
            });
        } else {
            this.getModel_home.addLike(data, sessionStorage.getItem('id_user')).then((response) => {
                if (response == 'success') {
                    event.currentTarget.className += " heart_active";
                } else if (response == 'fail') {
                    event.currentTarget.className = "sc_icon_table";
                }
            });
        }
    }

    addPlaylist(data, id_playlist, event) {
        if (!sessionStorage.getItem('id_user')) {
            Swal.fire({
                title: '<strong>Vui lòng đăng nhập để thực hiện chức năng này!</strong>',
                icon: 'warning',
                showCloseButton: true,
                focusConfirm: false,
                confirmButtonText: 'Ok!'
            });
        } else {
            this.getModel_home.addPlaylist(data, sessionStorage.getItem('id_user')).then((response) => {
                if (response == 'success') {
                    event.currentTarget.className += " heart_active";
                } else if (response == 'fail') {
                    event.currentTarget.className = "c_box_icon";
                }
            });
        }
    }

    changeLink(id_gg, singer, nameSong, imgSong) {
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

$(document).ready(function () {
    if (!sessionStorage.getItem("id_user") || sessionStorage.getItem("id_user") == '') {
        window.location.href = '#';
    }
});