define(["require", "exports", "../../lib/durandal/js/plugins/router", "knockout", "../../lib/sweetalert2/dist/sweetalert2.all.min", "../models/model_singer", "../models/model_home"], function (require, exports, m_router, ko, Swal, model_singer, model_home) {
    "use strict";
    return /** @class */ (function () {
        function class_1() {
            var _this = this;
            this.getModel_home = new model_home();
            this.getModel_singer = new model_singer();
            this.hiddenLoading = ko.observable(false);
            this.itemSong = ko.observableArray();
            this.itemSongPlaylist = ko.observableArray();
            this.param = m_router.activeInstruction().params[0];
            this.dataNameSinger = ko.observable('');
            this.dataImgSinger = ko.observable('');
            this.getData = this.getModel_singer.getDataSong(this.param, sessionStorage.getItem('id_user') ? sessionStorage.getItem('id_user') : 0).then(function (response) {
                response = JSON.parse(response);
                _this.dataNameSinger(response['dataNameSinger']);
                _this.dataImgSinger(response['dataImgSinger']);
                _this.itemSong(response['valueSongbySinger']);
                _this.itemSongPlaylist(response['valuePlaylist']);
                setTimeout(function () {
                    _this.hiddenLoading(true);
                }, 1500);
            });
        }
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
//# sourceMappingURL=singer.js.map