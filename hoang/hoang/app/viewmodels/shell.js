define(["require", "exports", "../../lib/durandal/js/plugins/router", "knockout", "jquery", "../../lib/sweetalert2/dist/sweetalert2.all.min"], function (require, exports, m_router, ko, $, Swal) {
    "use strict";
    return /** @class */ (function () {
        function class_1() {
            var _this = this;
            this.router = m_router;
            this.activate = function () {
                m_router.map([
                    { route: '', title: 'Home', moduleId: 'viewmodels/home', nav: true },
                    { route: 'login', moduleId: 'viewmodels/login', nav: true },
                    { route: 'profile', moduleId: 'viewmodels/profile', nav: true },
                    { route: 'new', moduleId: 'viewmodels/new', nav: true },
                    { route: 'singer/:id', moduleId: 'viewmodels/singer', nav: true },
                    { route: 'playlist/:id', moduleId: 'viewmodels/playlist', nav: true }
                ]).buildNavigationModel();
                return m_router.activate();
            };
            this.setIsSelected = ko.observable(false);
            this.isPlay = ko.observable(true);
            this.isPause = ko.observable(false);
            this.isSpinner = ko.observable(false);
            this.checkPlay = ko.observable(false);
            this.isLogin = ko.observable(sessionStorage.getItem("name_user") ? true : false);
            this.duration = ko.observable(0);
            this.hours = ko.observable(0);
            this.time = ko.observable(0);
            this.minutes = ko.observable(0);
            this.seconds = ko.observable(0);
            this.currentTime = ko.observable(0);
            this.currentTimeMinutes = ko.observable(0);
            this.currentTimeHours = ko.observable(0);
            this.currentTimeSeconds = ko.observable(0);
            this.currentTimeLine = ko.observable(0);
            this.strH = ko.observable('');
            this.strM = ko.observable('00:');
            this.strS = ko.observable('00');
            this.strLine = ko.observable('00:00');
            this.sttLoop = ko.observable(false);
            this.sttRandom = ko.observable(false);
            this.isURL = ko.observable(sessionStorage.getItem("isURL") ? sessionStorage.getItem("isURL") : '#');
            this.changeVolume = ko.observable(100);
            this.checkShowModalBottom = ko.observable(false);
            this.itemSong = ko.observableArray();
            this.id_gg = ko.observable(sessionStorage.getItem("id_gg") ? sessionStorage.getItem("id_gg") : '17ZUjG5iqEB-vMWaLEnmxNE4SMzzusxeX');
            this.singer = ko.observable(sessionStorage.getItem("name_singer") ? sessionStorage.getItem("name_singer") : 'Jack');
            this.nameSong = ko.observable(sessionStorage.getItem("name_song") ? sessionStorage.getItem("name_song") : 'Là 1 Thằng Con Trai');
            this.imgSong = ko.observable(sessionStorage.getItem("img_song") ? sessionStorage.getItem("img_song") : '../../assets/images/mqdefault_2.jpg');
            this.itemSongHistory = ko.observableArray(sessionStorage.getItem("arrHistory") ? JSON.parse(sessionStorage.getItem("arrHistory")) : []);
            this.isUser = ko.observable(sessionStorage.getItem("name_user") ? sessionStorage.getItem("name_user").charAt(0) : '');
            this.url_song = ko.observable(sessionStorage.getItem("url_song") ? sessionStorage.getItem("url_song") : 'https://docs.google.com/uc?export=download&id=17ZUjG5iqEB-vMWaLEnmxNE4SMzzusxeX');
            this.aud = new Audio(this.url_song());
            this.playSession = window.addEventListener('storage', function () {
                if (_this.url_song() != sessionStorage.getItem("url_song")) {
                    _this.url_song(sessionStorage.getItem("url_song"));
                    _this.aud.src = _this.url_song();
                    _this.singer(sessionStorage.getItem("name_singer"));
                    _this.nameSong(sessionStorage.getItem("name_song"));
                    _this.imgSong(sessionStorage.getItem("img_song"));
                    _this.isPlay(false);
                    _this.isPause(false);
                    _this.isSpinner(true);
                    _this.checkPlay(false);
                    _this.aud.load();
                }
            });
            this.checkPlayNew = this.aud.addEventListener("canplay", function () {
                _this.hours(Math.floor(_this.aud.duration / 3600));
                _this.time(_this.aud.duration - _this.hours() * 3600);
                _this.minutes(Math.floor(_this.time() / 60));
                _this.seconds(Math.round(_this.time() - _this.minutes() * 60));
                _this.duration(Math.round(_this.aud.duration));
                _this.isPlay(true);
                _this.isPause(false);
                _this.isSpinner(false);
                _this.checkPlay(false);
                _this.playSong();
            });
            this.checkUpdateTime = this.aud.addEventListener("timeupdate", function () {
                if (_this.aud.currentTime == _this.aud.duration && !_this.sttLoop()) {
                    _this.pauseSong();
                }
                _this.currentTime(_this.aud.currentTime);
                _this.currentTimeHours(Math.floor(_this.currentTime() / 3600));
                _this.currentTimeLine(_this.currentTime() - _this.currentTimeHours() * 3600);
                _this.currentTimeMinutes(Math.floor(_this.currentTimeLine() / 60));
                _this.currentTimeSeconds(Math.round(_this.currentTimeLine() - _this.currentTimeMinutes() * 60));
                if (_this.currentTimeHours() != 0) {
                    if (_this.currentTimeHours() < 10) {
                        _this.strH("0" + _this.currentTimeHours() + ":");
                    }
                    else {
                        _this.strH(_this.currentTimeHours() + ":");
                    }
                }
                if (_this.currentTimeMinutes() != 0) {
                    if (_this.currentTimeMinutes() < 10) {
                        _this.strM("0" + _this.currentTimeMinutes() + ":");
                    }
                    else {
                        _this.strM(_this.currentTimeMinutes + ":");
                    }
                }
                else {
                    _this.strM('00:');
                }
                if (_this.currentTimeSeconds() != 0) {
                    if (_this.currentTimeSeconds() < 10) {
                        _this.strS("0" + _this.currentTimeSeconds());
                    }
                    else {
                        _this.strS('' + _this.currentTimeSeconds());
                    }
                }
                else {
                    _this.strS('00');
                }
                _this.strLine(_this.strH() + _this.strM() + _this.strS());
                _this.aud.volume = _this.changeVolume() / 100;
            });
            this.getData = fetch('http://localhost:8080/music/get_ramdom_song', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id_user: sessionStorage.getItem("id_user") ? sessionStorage.getItem("id_user") : 0 })
            }).then(function (response) {
                return response.json();
            }).then(function (data) {
                var objItemNew = [];
                data.dataSongNew.map(function (value) {
                    objItemNew.push({ id: value.id, is_like: value.is_like, name: value.name, id_gg: value.id_gg, image: value.image, date_create: value.date_create, id_singer: value.id_singer, text_gr_singer: value.text_gr_singer });
                });
                _this.itemSong(objItemNew);
            });
        }
        class_1.prototype.changeLinkModal = function (id_gg, singer, nameSong, imgSong) {
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
        class_1.prototype.isLoop = function () {
            if (this.sttLoop()) {
                this.sttLoop(false);
                this.aud.loop = false;
            }
            else {
                this.sttLoop(true);
                this.aud.loop = true;
            }
        };
        class_1.prototype.isRandom = function () {
            if (this.sttRandom()) {
                this.sttRandom(false);
            }
            else {
                this.sttRandom(true);
            }
        };
        class_1.prototype.playSong = function () {
            var _this = this;
            if (this.aud.src != '') {
                this.aud.play();
                var checkExistsHistory = false;
                if (sessionStorage.getItem("arrHistory")) {
                    JSON.parse(sessionStorage.getItem("arrHistory")).map(function (value) {
                        if (value.id_gg == sessionStorage.getItem("id_gg")) {
                            checkExistsHistory = true;
                        }
                    });
                }
                if (!checkExistsHistory) {
                    var arr = [];
                    fetch('http://localhost:8080/music/check_like', {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json, text/plain, */*',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ url: sessionStorage.getItem('id_gg'), id_user: sessionStorage.getItem('id_user') })
                    }).then(function (response) {
                        return response.json();
                    }).then(function (dataRes) {
                        if (dataRes.message == 'success') {
                            arr.push({
                                id_gg: sessionStorage.getItem("id_gg"),
                                is_like: true,
                                singer: sessionStorage.getItem("name_singer"),
                                nameSong: sessionStorage.getItem("name_song"),
                                imgSong: sessionStorage.getItem("img_song")
                            });
                        }
                        else {
                            arr.push({
                                id_gg: sessionStorage.getItem("id_gg"),
                                is_like: false,
                                singer: sessionStorage.getItem("name_singer"),
                                nameSong: sessionStorage.getItem("name_song"),
                                imgSong: sessionStorage.getItem("img_song")
                            });
                        }
                        _this.itemSongHistory(_this.itemSongHistory().concat(arr));
                        sessionStorage.setItem("arrHistory", JSON.stringify(_this.itemSongHistory()));
                        _this.itemSongHistory(JSON.parse(sessionStorage.getItem("arrHistory")));
                    });
                }
                if (!this.aud.paused || this.aud.currentTime > 0) {
                    this.isPlay(false);
                    this.isPause(true);
                    this.isSpinner(false);
                    this.checkPlay(true);
                }
            }
        };
        class_1.prototype.pauseSong = function () {
            if (this.aud.src != '') {
                this.aud.pause();
                if (this.aud.paused && this.aud.currentTime > 0) {
                    this.isPlay(true);
                    this.isPause(false);
                    this.isSpinner(false);
                    this.checkPlay(false);
                }
            }
        };
        class_1.prototype.isLogout = function () {
            sessionStorage.removeItem("id_user");
            sessionStorage.removeItem("name_user");
            this.isLogin(false);
            this.isUser('');
        };
        class_1.prototype.getURL = function (url) {
            this.isURL(url);
            sessionStorage.setItem("isURL", url);
            window.location.href = this.isURL();
        };
        class_1.prototype.showModalBottom = function () {
            if (this.checkShowModalBottom()) {
                this.checkShowModalBottom(false);
            }
            else {
                this.checkShowModalBottom(true);
            }
        };
        class_1.prototype.showModalUpload = function () {
            $('#uploadModal').modal('show');
        };
        class_1.prototype.addHeartModal = function (data, id_song, event) {
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
                fetch('http://localhost:8080/music/add_like_byURL', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json, text/plain, */*',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ url: data, id_user: sessionStorage.getItem('id_user') })
                }).then(function (response) {
                    return response.json();
                }).then(function (dataRes) {
                    if (dataRes.message == 'success') {
                        event.currentTarget.className += " heart_active";
                    }
                    else if (dataRes.message == 'delete') {
                        event.currentTarget.className = "icon_action_song";
                    }
                });
            }
        };
        return class_1;
    }());
});
//# sourceMappingURL=shell.js.map