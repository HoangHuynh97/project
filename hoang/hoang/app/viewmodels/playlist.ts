import m_router = require('../../lib/durandal/js/plugins/router');
import ko = require('knockout');
import $ = require('jquery');
import Swal = require('../../lib/sweetalert2/dist/sweetalert2.all.min');
import global = require('../../assets/js/global');
import model_home = require('../models/model_home');
import model_playlist = require('../models/model_playlist');

export = class {
    getModel_home = new model_home();
    getModel_playlist = new model_playlist();
    hiddenLoading = ko.observable(false);
    itemSong = ko.observableArray();
    param = m_router.activeInstruction().params[0];
    NamePlaylist = ko.observable('');
    NameCreateBy = ko.observable('');
    ArrIMG = ko.observable('');

    getData = this.getModel_playlist.getDataSong(this.param, sessionStorage.getItem('id_user') ? sessionStorage.getItem('id_user') : 0).then((response) => {
        response = JSON.parse(response);

        this.NamePlaylist(response['namePlaylist']);
        this.NameCreateBy(response['nameCreateBy']);
        this.ArrIMG(response['ArrIMG']);
        this.itemSong(response['valueObjItemNew']);
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

    randomPlay() {
        sessionStorage.removeItem("arrHistory");

        var arr = [];
        this.itemSong().map(function (value) {
            arr.push({
                id_gg: value['id_gg'],
                is_like: false,
                singer: value['text_gr_singer'],
                nameSong: value['name'],
                imgSong: '../../assets/images' + value['image']
            });
        });
        sessionStorage.setItem("arrHistory", JSON.stringify(arr));
        sessionStorage.setItem("checkPlayIsRandom", '1');

        if (sessionStorage.getItem("url_song") != '') {
            sessionStorage.removeItem("url_song");
            sessionStorage.removeItem("id_gg");
            sessionStorage.removeItem("name_singer");
            sessionStorage.removeItem("name_song");
            sessionStorage.removeItem("img_song");
        }
        sessionStorage.setItem("url_song", 'https://docs.google.com/uc?export=download&id=' + this.itemSong()[0]['id_gg']);
        sessionStorage.setItem("id_gg", this.itemSong()[0]['id_gg']);
        sessionStorage.setItem("name_singer", this.itemSong()[0]['text_gr_singer']);
        sessionStorage.setItem("name_song", this.itemSong()[0]['name']);
        sessionStorage.setItem("img_song", '../../assets/images' + this.itemSong()[0]['image']);

        window.dispatchEvent(new Event("storage"));
    }
}