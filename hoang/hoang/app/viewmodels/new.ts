import ko = require('knockout');
import $ = require('jquery');
import Swal = require('../../lib/sweetalert2/dist/sweetalert2.all.min');

export = class home {
    hiddenLoading = ko.observable(false);
    isStart = ko.observable(0);
    itemSong = ko.observableArray();
    sttLoadmore = ko.observable(true);

    getData = fetch('http://localhost:8080/music/get_DataNew', {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id_user: sessionStorage.getItem('id_user') ? sessionStorage.getItem('id_user') : 0, isStart: this.isStart(), loadMore: 20 })
    }).then((response) => {
        return response.json();
    }).then((data) => {
        var objItemNew = [];
        data.dataSongNew.map(function (value) {
            objItemNew.push({ id: value.id, is_like: value.is_like, name: value.name, id_gg: value.id_gg, image: '../../assets/images' + value.image, date_create: value.date_create, id_singer: value.id_singer, text_gr_singer: value.text_gr_singer });
        });
        this.itemSong(objItemNew);
        this.isStart(this.isStart() + 20);

        setTimeout(() => {
            this.hiddenLoading(true);
        }, 1500);
    });

    async loadMore() {
        this.hiddenLoading(false);
        await fetch('http://localhost:8080/music/get_DataNew', {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id_user: sessionStorage.getItem('id_user') ? sessionStorage.getItem('id_user') : 0, isStart: this.isStart(), loadMore: 20 })
        }).then((response) => {
            return response.json();
        }).then((data) => {
            var objItemNew = [];
            data.dataSongNew.map(function (value) {
                objItemNew.push({ id: value.id, is_like: value.is_like, name: value.name, id_gg: value.id_gg, image: '../../assets/images' + value.image, date_create: value.date_create, id_singer: value.id_singer, text_gr_singer: value.text_gr_singer });
            });

            this.itemSong(this.itemSong().concat(objItemNew));
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