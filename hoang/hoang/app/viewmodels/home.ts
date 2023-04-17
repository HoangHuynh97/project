import ko = require('knockout');
import $ = require('jquery');
import Swal = require('../../lib/sweetalert2/dist/sweetalert2.all.min');
import model_home = require('../models/model_home');

export = class home {
    getModel_home = new model_home();
    hiddenLoading = ko.observable(false);
    bannerSlide = ko.observableArray(this.getModel_home.bannerSlide());

    setTime = 5;
    setTimeSinger = 5;
    nextSlide() {
        this.bannerSlide.push(this.bannerSlide.shift());
        this.setTime = 5;
    };

    prevSlide() {
        this.bannerSlide.unshift(this.bannerSlide.pop());
        this.setTime = 5;
    };

    timer: ReturnType<typeof setInterval> = setInterval(() => {
        this.checkTime(this.setTime);
        this.checkTimeSinger(this.setTimeSinger);
    }, 1000);

    checkTime(time) {
        if (time == 0) {
            this.nextSlide();
            this.setTime = 5;
        } else {
            this.setTime = time - 1;
        }
    }

    bannerSinger = ko.observableArray();
    nextSinger() {
        this.bannerSinger.push(this.bannerSinger.shift());
        this.setTimeSinger = 5;
    };

    prevSinger() {
        this.bannerSinger.unshift(this.bannerSinger.pop());
        this.setTimeSinger = 5;
    };

    checkTimeSinger(time) {
        if (time == 0) {
            this.nextSinger();
            this.setTimeSinger = 5;
        } else {
            this.setTimeSinger = time - 1;
        }
    }

    itemSongNew = ko.observableArray();
    itemPlaylist = ko.observableArray();
    itemSongHot = ko.observableArray();
    getData = this.getModel_home.getDataSong(sessionStorage.getItem('id_user') ? sessionStorage.getItem('id_user') : 0).then((response) => {
        response = JSON.parse(response);
        this.itemSongNew(response['valueObjItemNew']);
        this.itemPlaylist(response['valueObjPlaylist']);
        this.bannerSinger(response['valueObjPlaySinger']);
        this.itemSongHot(response['valueObjSongHot']);
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