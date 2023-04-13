define(["require", "exports", "knockout", "jquery", "../../lib/sweetalert2/dist/sweetalert2.all.min"], function (require, exports, ko, $, Swal) {
    "use strict";
    $(document).ready(function () {
        if (!sessionStorage.getItem("id_user") || sessionStorage.getItem("id_user") == '') {
            window.location.href = '#';
        }
    });
    return /** @class */ (function () {
        function home() {
            var _this = this;
            this.hiddenLoading = ko.observable(false);
            this.itemSong = ko.observableArray();
            this.itemSongLike = ko.observableArray();
            this.itemSongLikePlaylist = ko.observableArray();
            this.isTab = ko.observable(1);
            this.getData = fetch('http://localhost:8080/music/get_DataProfile', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id_user: sessionStorage.getItem("id_user") })
            }).then(function (response) {
                return response.json();
            }).then(function (data) {
                var objItemNew = [];
                data.dataPlaylist.map(function (value) {
                    objItemNew.push({ name: value.name, is_like: value.is_like, id: value.id, img: value.img, create_by: value.create_by });
                });
                _this.itemSong(objItemNew);
                var objItemLike = [];
                data.dataSongLike.map(function (value) {
                    objItemLike.push({ id: value.id, is_like: value.is_like, name: value.name, id_gg: value.id_gg, image: '../../assets/images' + value.image, date_create: value.date_create, id_singer: value.id_singer, text_gr_singer: value.text_gr_singer });
                });
                _this.itemSongLike(objItemLike);
                var objItemLikePlaylist = [];
                if (data.dataPlaylistLike) {
                    data.dataPlaylistLike.map(function (value) {
                        objItemLikePlaylist.push({ name: value.name, is_like: value.is_like, id: value.id, img: value.img, create_by: value.create_by });
                    });
                }
                _this.itemSongLikePlaylist(objItemLikePlaylist);
                setTimeout(function () {
                    _this.hiddenLoading(true);
                }, 1500);
            });
        }
        home.prototype.changeViewTab = function (data, key) {
            if (data == 1) {
                this.isTab(1);
            }
            else if (data == 2) {
                this.isTab(2);
            }
            else if (data == 3) {
                this.isTab(3);
            }
        };
        home.prototype.addPlaylist = function (data, id_playlist, event) {
            if (!sessionStorage.getItem('id_user')) {
                Swal.fire({
                    title: '<strong>Vui lòng đăng nhập để thực hiện chức năng này!</strong>',
                    icon: 'warning',
                    showCloseButton: true,
                    focusConfirm: false,
                    confirmButtonText: 'Ok!'
                });
            }
            else {
                fetch('http://localhost:8080/music/add_like_playlist', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json, text/plain, */*',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ id: data, id_user: sessionStorage.getItem('id_user') })
                }).then(function (response) {
                    return response.json();
                }).then(function (dataRes) {
                    if (dataRes.message == 'success') {
                        event.currentTarget.className += " heart_active";
                    }
                    else if (dataRes.message == 'delete') {
                        event.currentTarget.className = "c_box_icon";
                    }
                });
            }
        };
        home.prototype.addHeart = function (data, id_song, event) {
            if (!sessionStorage.getItem('id_user')) {
                Swal.fire({
                    title: '<strong>Vui lòng đăng nhập để thực hiện chức năng này!</strong>',
                    icon: 'warning',
                    showCloseButton: true,
                    focusConfirm: false,
                    confirmButtonText: 'Ok!'
                });
            }
            else {
                fetch('http://localhost:8080/music/add_like', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json, text/plain, */*',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ id: data, id_user: sessionStorage.getItem('id_user') })
                }).then(function (response) {
                    return response.json();
                }).then(function (dataRes) {
                    if (dataRes.message == 'success') {
                        event.currentTarget.className += " heart_active";
                    }
                    else if (dataRes.message == 'delete') {
                        event.currentTarget.className = "sc_icon_table";
                    }
                });
            }
        };
        home.prototype.changeLink = function (id_gg, singer, nameSong, imgSong) {
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
        return home;
    }());
});
//# sourceMappingURL=profile.js.map