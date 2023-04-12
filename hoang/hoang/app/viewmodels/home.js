define(["require", "exports", "knockout", "../../lib/sweetalert2/dist/sweetalert2.all.min"], function (require, exports, ko, Swal) {
    "use strict";
    return /** @class */ (function () {
        function home() {
            var _this = this;
            this.hiddenLoading = ko.observable(false);
            this.bannerSlide = ko.observableArray([
                { src: "../../assets/images/banner-template.jpg", id: 1 },
                { src: "../../assets/images/banner-template2.jpg", id: 2 },
                { src: "../../assets/images/banner-template3.jpg", id: 3 },
                { src: "../../assets/images/banner-template4.jpg", id: 4 },
                { src: "../../assets/images/banner-template5.jpg", id: 5 }
            ]);
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
            this.getData = fetch('http://localhost:8080/music/get_DataSong', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id_user: sessionStorage.getItem('id_user') ? sessionStorage.getItem('id_user') : 0 })
            }).then(function (response) {
                return response.json();
            }).then(function (data) {
                var objItemNew = [];
                data.dataSongNew.map(function (value) {
                    objItemNew.push({ id: value.id, is_like: value.is_like, name: value.name, id_gg: value.id_gg, image: '../../assets/images' + value.image, date_create: value.date_create, id_singer: value.id_singer, text_gr_singer: value.text_gr_singer });
                });
                _this.itemSongNew(objItemNew);
                var objPlaylist = [];
                data.dataPlaylist.map(function (value) {
                    objPlaylist.push({ id: value.id, is_like: value.is_like, name: value.name, img: value.img, create_by: 'Được tạo bởi ' + value.create_by });
                });
                _this.itemPlaylist(objPlaylist);
                var objPlaySinger = [];
                data.dataSinger_hot.map(function (value) {
                    objPlaySinger.push({ name: value.name, img: '../../assets/images' + value.img, id: value.id });
                });
                _this.bannerSinger(objPlaySinger);
                var objSongHot = [];
                data.dataSongHot.map(function (value) {
                    objSongHot.push({ id: value.id, is_like: value.is_like, name: value.name, id_gg: value.id_gg, image: '../../assets/images' + value.image, date_create: value.date_create, id_singer: value.id_singer, text_gr_singer: value.text_gr_singer });
                });
                _this.itemSongHot(objSongHot);
                _this.hiddenLoading(true);
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