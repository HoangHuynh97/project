define(["require", "exports", "knockout", "../../lib/sweetalert2/dist/sweetalert2.all.min", "../models/model_home"], function (require, exports, ko, Swal, model_home) {
    "use strict";
    return /** @class */ (function () {
        function home() {
            var _this = this;
            this.getModel_home = new model_home();
            this.hiddenLoading = ko.observable(false);
            this.bannerSlide = ko.observableArray(this.getModel_home.bannerSlide());
            this.setTime = 5;
            this.setTimeSinger = 5;
            this.timer = setInterval(function () {
                _this.checkTime(_this.setTime);
                _this.checkTimeSinger(_this.setTimeSinger);
            }, 1000);
            this.bannerSinger = ko.observableArray();
            this.itemSongNew = ko.observableArray();
            this.itemPlaylist = ko.observableArray();
            this.itemSongHot = ko.observableArray();
            this.getData = this.getModel_home.getDataSong(sessionStorage.getItem('id_user') ? sessionStorage.getItem('id_user') : 0).then(function (response) {
                response = JSON.parse(response);
                _this.itemSongNew(response['valueObjItemNew']);
                _this.itemPlaylist(response['valueObjPlaylist']);
                _this.bannerSinger(response['valueObjPlaySinger']);
                _this.itemSongHot(response['valueObjSongHot']);
                setTimeout(function () {
                    _this.hiddenLoading(true);
                }, 1500);
            });
        }
        home.prototype.nextSlide = function () {
            this.bannerSlide.push(this.bannerSlide.shift());
            this.setTime = 5;
        };
        ;
        home.prototype.prevSlide = function () {
            this.bannerSlide.unshift(this.bannerSlide.pop());
            this.setTime = 5;
        };
        ;
        home.prototype.checkTime = function (time) {
            if (time == 0) {
                this.nextSlide();
                this.setTime = 5;
            }
            else {
                this.setTime = time - 1;
            }
        };
        home.prototype.nextSinger = function () {
            this.bannerSinger.push(this.bannerSinger.shift());
            this.setTimeSinger = 5;
        };
        ;
        home.prototype.prevSinger = function () {
            this.bannerSinger.unshift(this.bannerSinger.pop());
            this.setTimeSinger = 5;
        };
        ;
        home.prototype.checkTimeSinger = function (time) {
            if (time == 0) {
                this.nextSinger();
                this.setTimeSinger = 5;
            }
            else {
                this.setTimeSinger = time - 1;
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
//# sourceMappingURL=home.js.map