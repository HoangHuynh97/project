define(["require", "exports", "knockout", "../../lib/sweetalert2/dist/sweetalert2.all.min", "../../assets/js/global"], function (require, exports, ko, Swal, global) {
    "use strict";
    return /** @class */ (function () {
        function class_1() {
            var _this = this;
            this.isPlay = ko.observable(true);
            this.isPause = ko.observable(false);
            this.isSpinner = ko.observable(false);
            this.checkPlay = ko.observable(false);
            this.duration = ko.observable(0);
            this.hours = ko.observable(0);
            this.minutes = ko.observable(0);
            this.seconds = ko.observable(0);
            this.currentTime = ko.observable(0);
            this.strLine = ko.observable('00:00');
            this.sttLoop = ko.observable(false);
            this.sttRandom = ko.observable(false);
            this.changeVolume = ko.observable(100);
            this.checkShowModalBottom = ko.observable(false);
            this.itemSong = ko.observableArray();
            this.isCheckPlaying = sessionStorage.getItem("id_gg") ? [sessionStorage.getItem("id_gg")] : [];
            this.id_gg = ko.observable(sessionStorage.getItem("id_gg") ? sessionStorage.getItem("id_gg") : '');
            this.singer = ko.observable(sessionStorage.getItem("name_singer") ? sessionStorage.getItem("name_singer") : '');
            this.nameSong = ko.observable(sessionStorage.getItem("name_song") ? sessionStorage.getItem("name_song") : '');
            this.imgSong = ko.observable(sessionStorage.getItem("img_song") ? sessionStorage.getItem("img_song") : '');
            this.itemSongHistory = ko.observableArray(sessionStorage.getItem("arrHistory") ? JSON.parse(sessionStorage.getItem("arrHistory")) : []);
            this.url_song = ko.observable(sessionStorage.getItem("url_song") ? sessionStorage.getItem("url_song") : '');
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
                var time = _this.aud.duration - _this.hours() * 3600;
                _this.minutes(Math.floor(time / 60));
                _this.seconds(Math.round(time - _this.minutes() * 60));
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
                var currentTime = _this.aud.currentTime;
                var currentTimeHours = Math.floor(currentTime / 3600);
                var currentTimeLine = currentTime - currentTimeHours * 3600;
                var currentTimeMinutes = Math.floor(currentTimeLine / 60);
                var currentTimeSeconds = Math.round(currentTimeLine - currentTimeMinutes * 60);
                var strH = '';
                var strM = '00:';
                var strS = '00';
                if (currentTimeHours != 0) {
                    if (currentTimeHours < 10) {
                        strH = "0" + currentTimeHours + ":";
                    }
                    else {
                        strH = currentTimeHours + ":";
                    }
                }
                if (currentTimeMinutes != 0) {
                    if (currentTimeMinutes < 10) {
                        strM = "0" + currentTimeMinutes + ":";
                    }
                    else {
                        strM = currentTimeMinutes + ":";
                    }
                }
                else {
                    strM = '00:';
                }
                if (currentTimeSeconds != 0) {
                    if (currentTimeSeconds < 10) {
                        strS = "0" + currentTimeSeconds;
                    }
                    else {
                        strS = '' + currentTimeSeconds;
                    }
                }
                else {
                    strS = '00';
                }
                _this.strLine(strH + strM + strS);
                _this.aud.volume = _this.changeVolume() / 100;
            });
            this.keySongRanDom = ko.observable(0);
            this.getData = fetch(global.api_url + 'get_ramdom_song', {
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
                if (!sessionStorage.getItem("url_song")) {
                    _this.changeLinkModal(_this.itemSong()[0]['id_gg'], _this.itemSong()[0]['text_gr_singer'], _this.itemSong()[0]['name'], '../../assets/images' + _this.itemSong()[0]['image']);
                }
            });
            this.setIsMobile = ko.observable(false);
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
                this.isCheckPlaying.push(sessionStorage.getItem("id_gg"));
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
                    fetch(global.api_url + 'check_like', {
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
        class_1.prototype.showModalBottom = function () {
            if (this.checkShowModalBottom()) {
                this.checkShowModalBottom(false);
            }
            else {
                this.checkShowModalBottom(true);
            }
        };
        class_1.prototype.isForward = function () {
            var arrPlaying = this.isCheckPlaying;
            this.itemSongHistory().map(function (value) {
                if (arrPlaying.indexOf(value['id_gg']) == -1) {
                    if (sessionStorage.getItem("url_song") != '') {
                        sessionStorage.removeItem("url_song");
                        sessionStorage.removeItem("id_gg");
                        sessionStorage.removeItem("name_singer");
                        sessionStorage.removeItem("name_song");
                        sessionStorage.removeItem("img_song");
                    }
                    sessionStorage.setItem("url_song", 'https://docs.google.com/uc?export=download&id=' + value['id_gg']);
                    sessionStorage.setItem("id_gg", value['id_gg']);
                    sessionStorage.setItem("name_singer", value['singer']);
                    sessionStorage.setItem("name_song", value['nameSong']);
                    sessionStorage.setItem("img_song", value['imgSong']);
                    window.dispatchEvent(new Event("storage"));
                }
            });
            if (arrPlaying.length >= this.itemSongHistory().length) {
                if (sessionStorage.getItem("url_song") != '') {
                    sessionStorage.removeItem("url_song");
                    sessionStorage.removeItem("id_gg");
                    sessionStorage.removeItem("name_singer");
                    sessionStorage.removeItem("name_song");
                    sessionStorage.removeItem("img_song");
                }
                sessionStorage.setItem("url_song", 'https://docs.google.com/uc?export=download&id=' + this.itemSong()[this.keySongRanDom()]['id_gg']);
                sessionStorage.setItem("id_gg", this.itemSong()[this.keySongRanDom()]['id_gg']);
                sessionStorage.setItem("name_singer", this.itemSong()[this.keySongRanDom()]['text_gr_singer']);
                sessionStorage.setItem("name_song", this.itemSong()[this.keySongRanDom()]['name']);
                sessionStorage.setItem("img_song", '../../assets/images' + this.itemSong()[this.keySongRanDom()]['image']);
                window.dispatchEvent(new Event("storage"));
                this.keySongRanDom(this.keySongRanDom() + 1);
            }
        };
        class_1.prototype.isBackward = function () {
            if (this.isCheckPlaying.length > 1) {
                this.isCheckPlaying.pop();
                fetch(global.api_url + 'get_song_by_url', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json, text/plain, */*',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        url: this.isCheckPlaying[this.isCheckPlaying.length - 1],
                        id_user: sessionStorage.getItem('id_user') ? sessionStorage.getItem('id_user') : 0
                    })
                }).then(function (response) {
                    return response.json();
                }).then(function (dataRes) {
                    if (sessionStorage.getItem("url_song") != '') {
                        sessionStorage.removeItem("url_song");
                        sessionStorage.removeItem("id_gg");
                        sessionStorage.removeItem("name_singer");
                        sessionStorage.removeItem("name_song");
                        sessionStorage.removeItem("img_song");
                    }
                    sessionStorage.setItem("url_song", 'https://docs.google.com/uc?export=download&id=' + dataRes.dataSongNew[0]['id_gg']);
                    sessionStorage.setItem("id_gg", dataRes.dataSongNew[0]['id_gg']);
                    sessionStorage.setItem("name_singer", dataRes.dataSongNew[0]['text_gr_singer']);
                    sessionStorage.setItem("name_song", dataRes.dataSongNew[0]['name']);
                    sessionStorage.setItem("img_song", '../../assets/images' + dataRes.dataSongNew[0]['image']);
                    window.dispatchEvent(new Event("storage"));
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
                fetch(global.api_url + 'add_like_byURL', {
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
        class_1.prototype.openBottom = function () {
            var widthClient = document.documentElement.clientWidth;
            if (widthClient < 480) {
                this.setIsMobile(true);
            }
        };
        class_1.prototype.closeBottom = function () {
            this.setIsMobile(false);
        };
        return class_1;
    }());
});
//# sourceMappingURL=bottom.js.map