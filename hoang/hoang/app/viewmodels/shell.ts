import m_router = require('../../lib/durandal/js/plugins/router');
import m_system = require('../../lib/durandal/js/system');
import ko = require('knockout');

export = class {
    router = m_router;
    activate = function () {
        m_router.map([
            { route: '', title: 'Home', moduleId: 'viewmodels/home', nav: true },
            { route: 'login', moduleId: 'viewmodels/login', nav: true },
            { route: 'test', moduleId: 'viewmodels/test', nav: true }
        ]).buildNavigationModel();

        return m_router.activate();
    };

    setIsSelected = ko.observable(false);
    isPlay = ko.observable(false);
    isPause = ko.observable(false);
    isSpinner = ko.observable(true);
    checkPlay = ko.observable(false);

    duration = ko.observable(0);
    hours = ko.observable(0);
    time = ko.observable(0);
    minutes = ko.observable(0);
    seconds = ko.observable(0);
    currentTime = ko.observable(0);
    currentTimeMinutes = ko.observable(0);
    currentTimeHours = ko.observable(0);
    currentTimeSeconds = ko.observable(0);
    currentTimeLine = ko.observable(0);
    strH = ko.observable('');
    strM = ko.observable('00:');
    strS = ko.observable('00');
    strLine = ko.observable('');
    sttLoop = ko.observable(false);


    id_gg = ko.observable('17ZUjG5iqEB-vMWaLEnmxNE4SMzzusxeX');
    singer = ko.observable('Jack');
    nameSong = ko.observable('Là 1 Thằng Con Trai');
    imgSong = ko.observable('../../assets/images/mqdefault_2.jpg');


    url_song = ko.observable('');
    aud = new Audio();
    playSession = window.addEventListener('storage', () => {
        this.url_song(sessionStorage.getItem("url_song"));
        this.aud.src = this.url_song();

        this.singer(sessionStorage.getItem("name_singer"));
        this.nameSong(sessionStorage.getItem("name_song"));
        this.imgSong(sessionStorage.getItem("img_song"));

        this.isPlay(false);
        this.isPause(false);
        this.isSpinner(true);
        this.checkPlay(false);

        this.aud.load();
    });

    checkPlayNew = this.aud.addEventListener("canplay", () => {
        this.hours(Math.floor(this.aud.duration / 3600));
        this.time(this.aud.duration - this.hours() * 3600);
        this.minutes(Math.floor(this.time() / 60));
        this.seconds(Math.round(this.time() - this.minutes() * 60));

        this.duration(Math.round(this.aud.duration));

        this.isPlay(true);
        this.isPause(false);
        this.isSpinner(false);
        this.checkPlay(false);

        this.playSong();
    });

    checkUpdateTime = this.aud.addEventListener("timeupdate", () => {
        this.currentTime(this.aud.currentTime);
        this.currentTimeHours(Math.floor(this.currentTime() / 3600));
        this.currentTimeLine(this.currentTime() - this.currentTimeHours() * 3600);
        this.currentTimeMinutes(Math.floor(this.currentTimeLine() / 60));
        this.currentTimeSeconds(Math.round(this.currentTimeLine() - this.currentTimeMinutes() * 60));

        if (this.currentTimeHours() != 0) {
            if (this.currentTimeHours() < 10) {
                this.strH("0" + this.currentTimeHours() + ":");
            } else {
                this.strH(this.currentTimeHours() + ":");
            }
        }

        if (this.currentTimeMinutes() != 0) {
            if (this.currentTimeMinutes() < 10) {
                this.strM("0" + this.currentTimeMinutes() + ":");
            } else {
                this.strM(this.currentTimeMinutes + ":");
            }
        }

        if (this.currentTimeSeconds() != 0) {
            if (this.currentTimeSeconds() < 10) {
                this.strS("0" + this.currentTimeSeconds());
            } else {
                this.strS(''+this.currentTimeSeconds());
            }
        }

        this.strLine(this.strH() + this.strM() + this.strS());
    });

    isLoop() {
        if (this.sttLoop()) {
            this.sttLoop(false);
            this.aud.loop = false;
        } else {
            this.sttLoop(true);
            this.aud.loop = true;
        }
    }

    playSong() {
        if (this.aud.src != '') {
            this.aud.play();
            
            if (!this.aud.paused || this.aud.currentTime > 0) {
                this.isPlay(false);
                this.isPause(true);
                this.isSpinner(false);
                this.checkPlay(true);
            }
        }
    }

    pauseSong() {
        if (this.aud.src != '') {
            this.aud.pause();
            if (this.aud.paused && this.aud.currentTime > 0) {
                this.isPlay(true);
                this.isPause(false);
                this.isSpinner(false);
                this.checkPlay(false);
            }
        }
    }
}