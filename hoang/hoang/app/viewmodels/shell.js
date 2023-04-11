define(["require", "exports", "../../lib/durandal/js/plugins/router", "knockout", "../../lib/sweetalert2/dist/sweetalert2.all.min"], function (require, exports, m_router, ko, Swal) {
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
            this.checkShowModalUpload = ko.observable(false);
            this.checkShowModalAddPlaylist = ko.observable(false);
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
                    if (sessionStorage.getItem("checkPlayIsRandom") == '1') {
                        _this.itemSongHistory(JSON.parse(sessionStorage.getItem("arrHistory")));
                        sessionStorage.removeItem("checkPlayIsRandom");
                    }
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
            this.fileImage = ko.observable();
            this.data = new FormData();
            this.valueNameSong = ko.observable('');
            this.valueSinger = ko.observable('');
            this.valueIDGG = ko.observable('');
            this.sttInputSearch = ko.observable(false);
            this.valueNamePlaylist = ko.observable('');
            this.saved_value = ko.observable('');
            this.itemSongSearchInput = ko.observableArray();
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
                        body: JSON.stringify({
                            url: sessionStorage.getItem('id_gg') ? sessionStorage.getItem('id_gg') : '17ZUjG5iqEB-vMWaLEnmxNE4SMzzusxeX',
                            id_user: sessionStorage.getItem('id_user') ? sessionStorage.getItem('id_user') : 0
                        })
                    }).then(function (response) {
                        return response.json();
                    }).then(function (dataRes) {
                        if (dataRes.message == 'success') {
                            arr.push({
                                id_gg: sessionStorage.getItem("id_gg") ? sessionStorage.getItem("id_gg") : '17ZUjG5iqEB-vMWaLEnmxNE4SMzzusxeX',
                                is_like: true,
                                singer: sessionStorage.getItem("name_singer") ? sessionStorage.getItem("name_singer") : 'Jack',
                                nameSong: sessionStorage.getItem("name_song") ? sessionStorage.getItem("name_song") : 'Là 1 Thằng Con Trai',
                                imgSong: sessionStorage.getItem("img_song") ? sessionStorage.getItem("img_song") : '../../assets/images/mqdefault_2.jpg'
                            });
                        }
                        else {
                            arr.push({
                                id_gg: sessionStorage.getItem("id_gg") ? sessionStorage.getItem("id_gg") : '17ZUjG5iqEB-vMWaLEnmxNE4SMzzusxeX',
                                is_like: false,
                                singer: sessionStorage.getItem("name_singer") ? sessionStorage.getItem("name_singer") : 'Jack',
                                nameSong: sessionStorage.getItem("name_song") ? sessionStorage.getItem("name_song") : 'Là 1 Thằng Con Trai',
                                imgSong: sessionStorage.getItem("img_song") ? sessionStorage.getItem("img_song") : '../../assets/images/mqdefault_2.jpg'
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
            this.checkShowModalUpload(true);
        };
        class_1.prototype.hiddenModalUpload = function () {
            this.checkShowModalUpload(false);
        };
        class_1.prototype.showModalAddPlaylist = function () {
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
                this.checkShowModalAddPlaylist(true);
            }
        };
        class_1.prototype.hiddenModalAddPlaylist = function () {
            this.checkShowModalAddPlaylist(false);
        };
        class_1.prototype.uploadImage = function (file) {
            this.data.append('image', file);
            this.fileImage(file);
        };
        class_1.prototype.saveUploadSong = function () {
            var _this = this;
            if (this.valueNameSong() == '' || this.valueSinger() == '' || this.valueIDGG() == '' || !this.fileImage()) {
                Swal.fire({
                    title: '<strong>Vui lòng nhập đầy đủ thông tin!</strong>',
                    icon: 'warning',
                    showCloseButton: true,
                    focusConfirm: false,
                    confirmButtonText: 'Ok!'
                });
            }
            else {
                this.data.append('song', this.valueNameSong());
                this.data.append('singer', this.valueSinger());
                this.data.append('gg', this.valueIDGG());
                fetch('http://localhost:8080/music/upload_song', {
                    method: 'POST',
                    body: this.data
                }).then(function (response) {
                    return response.json();
                }).then(function (dataRes) {
                    if (dataRes.message == 'fail') {
                        Swal.fire({
                            title: '<strong>Hệ thống xảy ra lỗi, vui lòng thử lại sau!</strong>',
                            icon: 'error',
                            showCloseButton: true,
                            focusConfirm: false,
                            confirmButtonText: 'Ok!'
                        });
                    }
                    else {
                        Swal.fire({
                            title: '<strong>Thêm bài hát mới thành công!</strong>',
                            icon: 'success',
                            showCloseButton: true,
                            focusConfirm: false,
                            confirmButtonText: 'Ok!'
                        });
                        _this.checkShowModalUpload(false);
                    }
                });
            }
        };
        class_1.prototype.value_changed = function () {
            var _this = this;
            if (this.saved_value() != '') {
                fetch('http://localhost:8080/music/search_song_byName', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json, text/plain, */*',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ key_search: this.saved_value() })
                }).then(function (response) {
                    return response.json();
                }).then(function (data) {
                    if (data.dataSongSearch) {
                        var objItemSearchInput = [];
                        data.dataSongSearch.map(function (value) {
                            objItemSearchInput.push({ id: value.id, name: value.name });
                        });
                        _this.itemSongSearchInput(objItemSearchInput);
                    }
                    else {
                        _this.itemSongSearchInput([{ id: 0, name: 'Không có dữ liệu!' }]);
                    }
                    _this.sttInputSearch(true);
                });
            }
            else {
                this.sttInputSearch(false);
            }
        };
        class_1.prototype.addValueInput = function (name, data, e) {
            if (this.saved_value().indexOf('|') == -1) {
                this.saved_value(name + ' | ');
            }
            else {
                this.saved_value(this.saved_value().replace(this.saved_value().slice(this.saved_value().lastIndexOf(' | ')), ' | '));
                this.saved_value(this.saved_value() + name + ' | ');
            }
            this.sttInputSearch(false);
        };
        class_1.prototype.saveAddPlaylist = function () {
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
                fetch('http://localhost:8080/music/add_playlist', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json, text/plain, */*',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ name: this.valueNamePlaylist(), id_user_create: sessionStorage.getItem('id_user'), value_song: this.saved_value() })
                }).then(function (response) {
                    return response.json();
                }).then(function (data) {
                    if (data.message == 'success') {
                        Swal.fire({
                            title: '<strong>Thêm danh sách phát thành công!</strong>',
                            icon: 'success',
                            showCloseButton: true,
                            focusConfirm: false,
                            confirmButtonText: 'Ok!'
                        });
                    }
                    else {
                        Swal.fire({
                            title: '<strong>Hệ thống lỗi, xin thử lại sau!</strong>',
                            icon: 'error',
                            showCloseButton: true,
                            focusConfirm: false,
                            confirmButtonText: 'Ok!'
                        });
                    }
                });
            }
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