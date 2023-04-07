define(["require", "exports", "../../lib/durandal/js/plugins/router", "knockout"], function (require, exports, m_router, ko) {
    "use strict";
    return /** @class */ (function () {
        function class_1() {
            var _this = this;
            this.router = m_router;
            this.activate = function () {
                m_router.map([
                    { route: '', title: 'Home', moduleId: 'viewmodels/home', nav: true },
                    { route: 'login', moduleId: 'viewmodels/login', nav: true },
                    { route: 'test', moduleId: 'viewmodels/test', nav: true }
                ]).buildNavigationModel();
                return m_router.activate();
            };
            this.setIsSelected = ko.observable(false);
            this.isPlay = ko.observable(false);
            this.isPause = ko.observable(false);
            this.isSpinner = ko.observable(true);
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
            this.strLine = ko.observable('');
            this.sttLoop = ko.observable(false);
            this.id_gg = ko.observable('17ZUjG5iqEB-vMWaLEnmxNE4SMzzusxeX');
            this.singer = ko.observable('Jack');
            this.nameSong = ko.observable('Là 1 Thằng Con Trai');
            this.imgSong = ko.observable('../../assets/images/mqdefault_2.jpg');
            this.isUser = ko.observable(sessionStorage.getItem("name_user") ? sessionStorage.getItem("name_user").charAt(0) : '');
            this.url_song = ko.observable('');
            this.aud = new Audio();
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
                if (_this.currentTimeSeconds() != 0) {
                    if (_this.currentTimeSeconds() < 10) {
                        _this.strS("0" + _this.currentTimeSeconds());
                    }
                    else {
                        _this.strS('' + _this.currentTimeSeconds());
                    }
                }
                _this.strLine(_this.strH() + _this.strM() + _this.strS());
            });
        }
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
        class_1.prototype.playSong = function () {
            if (this.aud.src != '') {
                this.aud.play();
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
        return class_1;
    }());
});
//# sourceMappingURL=shell.js.map