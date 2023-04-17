import ko = require('knockout');
import $ = require('jquery');
import Swal = require('../../lib/sweetalert2/dist/sweetalert2.all.min');
import global = require('../../assets/js/global');
import model_new = require('../models/model_new');

export = class {
    getModel_new = new model_new();
    hiddenLoading = ko.observable(false);
    isStart = ko.observable(0);
    itemSong = ko.observableArray();
    sttLoadmore = ko.observable(true);

    getData = this.getModel_new.getDataSong(sessionStorage.getItem('id_user') ? sessionStorage.getItem('id_user') : 0, this.isStart(), 20).then((response) => {
        response = JSON.parse(response);
        this.itemSong(response['valueObjItemNew']);
        this.isStart(this.isStart() + 20);
        setTimeout(() => {
            this.hiddenLoading(true);
        }, 1500);
    });

    loadMore() {
        this.hiddenLoading(false);
        this.getModel_new.getDataSong(sessionStorage.getItem('id_user') ? sessionStorage.getItem('id_user') : 0, this.isStart(), 20).then((response) => {
            response = JSON.parse(response);
            this.itemSong(this.itemSong().concat(response['valueObjItemNew']));
            this.isStart(this.isStart() + 20);
            if (this.isStart() == 100) {
                this.sttLoadmore(false);
            }
            setTimeout(() => {
                this.hiddenLoading(true);
            }, 1500);
        });
    };


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
            this.getModel_new.addHeart(data, sessionStorage.getItem('id_user')).then((response) => {
                if (response == 'success') {
                    event.currentTarget.className += " heart_active";
                } else if (response == 'fail') {
                    event.currentTarget.className = "sc_icon_table";
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