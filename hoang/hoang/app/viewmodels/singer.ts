import m_router = require('../../lib/durandal/js/plugins/router');
import ko = require('knockout');
import $ = require('jquery');
import Swal = require('../../lib/sweetalert2/dist/sweetalert2.all.min');
import global = require('../../assets/js/global');
import model_singer = require('../models/model_singer');
import model_home = require('../models/model_home');

export = class {
    getModel_home = new model_home();
    getModel_singer = new model_singer();
    hiddenLoading = ko.observable(false);
    itemSong = ko.observableArray();
    itemSongPlaylist = ko.observableArray();
    param = m_router.activeInstruction().params[0];
    dataNameSinger = ko.observable('');
    dataImgSinger = ko.observable('');

    getData = this.getModel_singer.getDataSong(this.param, sessionStorage.getItem('id_user') ? sessionStorage.getItem('id_user') : 0).then((response) => {
        response = JSON.parse(response);
        this.dataNameSinger(response['dataNameSinger']);
        this.dataImgSinger(response['dataImgSinger']);

        this.itemSong(response['valueSongbySinger']);
        this.itemSongPlaylist(response['valuePlaylist']);
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