import m_router = require('../../lib/durandal/js/plugins/router');
import ko = require('knockout');
import $ = require('jquery');
import Swal = require('../../lib/sweetalert2/dist/sweetalert2.all.min');

export = class home {
    itemSong = ko.observableArray();
    itemSongPlaylist = ko.observableArray();
    param = m_router.activeInstruction().params[0];
    dataNameSinger = ko.observable('');
    dataImgSinger = ko.observable('');

    getData = fetch('http://localhost:8080/music/get_Singer', {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id_singer: this.param, id_user: sessionStorage.getItem('id_user') ? sessionStorage.getItem('id_user') : 0 })
    }).then((response) => {
        return response.json();
    }).then((data) => {
        if (!data.dataNameSinger) {
            window.location.href = '#';
        }

        this.dataNameSinger(data.dataNameSinger);
        this.dataImgSinger(data.dataImgSinger);

        var objItemNew = [];
        data.dataSongbySinger.map(function (value) {
            objItemNew.push({ id: value.id, name: value.name, is_like: value.is_like, id_gg: value.id_gg, image: value.image, date_create: value.date_create, id_singer: value.id_singer, text_gr_singer: value.text_gr_singer });
        });
        this.itemSong(objItemNew);

        var objItemPlaylist = [];
        data.dataPlaylist.map(function (value) {
            objItemPlaylist.push({ id: value.id, is_like: value.is_like, name: value.name, img: value.img, create_by: value.create_by });
        });
        this.itemSongPlaylist(objItemPlaylist);
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
            fetch('http://localhost:8080/music/add_like', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: data, id_user: sessionStorage.getItem('id_user') })
            }).then((response) => {
                return response.json();
            }).then((dataRes) => {
                if (dataRes.message == 'success') {
                    event.currentTarget.className += " heart_active";
                } else if (dataRes.message == 'delete') {
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
            fetch('http://localhost:8080/music/add_like_playlist', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: data, id_user: sessionStorage.getItem('id_user') })
            }).then((response) => {
                return response.json();
            }).then((dataRes) => {
                if (dataRes.message == 'success') {
                    event.currentTarget.className += " heart_active";
                } else if (dataRes.message == 'delete') {
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