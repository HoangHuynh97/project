define(["require", "exports", "knockout", "jquery", "../../lib/sweetalert2/dist/sweetalert2.all.min", "../models/model_profile", "../models/model_home"], function (require, exports, ko, $, Swal, model_profile, model_home) {
    "use strict";
    $(document).ready(function () {
        if (!sessionStorage.getItem("id_user") || sessionStorage.getItem("id_user") == '') {
            window.location.href = '#';
        }
    });
    return /** @class */ (function () {
        function class_1() {
            var _this = this;
            this.getModel_profile = new model_profile();
            this.getModel_home = new model_home();
            this.hiddenLoading = ko.observable(false);
            this.itemSong = ko.observableArray();
            this.itemSongLike = ko.observableArray();
            this.itemSongLikePlaylist = ko.observableArray();
            this.isTab = ko.observable(1);
            this.getData = this.getModel_profile.getDataSong(sessionStorage.getItem('id_user') ? sessionStorage.getItem('id_user') : 0).then(function (response) {
                response = JSON.parse(response);
                _this.itemSong(response['valueObjItemNew']);
                _this.itemSongLike(response['valueObjItemLike']);
                _this.itemSongLikePlaylist(response['valueObjItemLikePlaylist']);
                setTimeout(function () {
                    _this.hiddenLoading(true);
                }, 1500);
            });
        }
        class_1.prototype.changeViewTab = function (data, key) {
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
        class_1.prototype.addHeart = function (data, id_song, event) {
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
                this.getModel_home.addLike(data, sessionStorage.getItem('id_user')).then(function (response) {
                    if (response == 'success') {
                        event.currentTarget.className += " heart_active";
                    }
                    else if (response == 'fail') {
                        event.currentTarget.className = "sc_icon_table";
                    }
                });
            }
        };
        class_1.prototype.addPlaylist = function (data, id_playlist, event) {
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
                this.getModel_home.addPlaylist(data, sessionStorage.getItem('id_user')).then(function (response) {
                    if (response == 'success') {
                        event.currentTarget.className += " heart_active";
                    }
                    else if (response == 'fail') {
                        event.currentTarget.className = "c_box_icon";
                    }
                });
            }
        };
        class_1.prototype.changeLink = function (id_gg, singer, nameSong, imgSong) {
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
//# sourceMappingURL=profile.js.map