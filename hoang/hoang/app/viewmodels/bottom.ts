import ko = require('knockout');
import $ = require('jquery');
import Swal = require('../../lib/sweetalert2/dist/sweetalert2.all.min');
import global = require('../../assets/js/global');

export = class {
    isPlay = ko.observable(true);
    isPause = ko.observable(false);
    isSpinner = ko.observable(false);
    checkPlay = ko.observable(false);
    duration = ko.observable(0);
    hours = ko.observable(0);
    minutes = ko.observable(0);
    seconds = ko.observable(0);
    currentTime = ko.observable(0);
    strLine = ko.observable('00:00');
    sttLoop = ko.observable(false);
    sttRandom = ko.observable(false);
    changeVolume = ko.observable(100);
    checkShowModalBottom = ko.observable(false);
    itemSong = ko.observableArray();
    isCheckPlaying = sessionStorage.getItem("id_gg") ? [sessionStorage.getItem("id_gg")] : [];
    id_gg = ko.observable(sessionStorage.getItem("id_gg") ? sessionStorage.getItem("id_gg") : '');
    singer = ko.observable(sessionStorage.getItem("name_singer") ? sessionStorage.getItem("name_singer") : '');
    nameSong = ko.observable(sessionStorage.getItem("name_song") ? sessionStorage.getItem("name_song") : '');
    imgSong = ko.observable(sessionStorage.getItem("img_song") ? sessionStorage.getItem("img_song") : '');
    itemSongHistory = ko.observableArray(sessionStorage.getItem("arrHistory") ? JSON.parse(sessionStorage.getItem("arrHistory")) : []);
    url_song = ko.observable(sessionStorage.getItem("url_song") ? sessionStorage.getItem("url_song") : '');
    aud = new Audio(this.url_song());

    changeLinkModal(id_gg, singer, nameSong, imgSong) {
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
    }

    playSession = window.addEventListener('storage', () => {
        if (this.url_song() != sessionStorage.getItem("url_song")) {
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

            if (sessionStorage.getItem("checkPlayIsRandom") == '1') {
                this.itemSongHistory(JSON.parse(sessionStorage.getItem("arrHistory")));
                sessionStorage.removeItem("checkPlayIsRandom");
            }
        }
    });

    checkPlayNew = this.aud.addEventListener("canplay", () => {
        this.hours(Math.floor(this.aud.duration / 3600));
        let time = this.aud.duration - this.hours() * 3600;
        this.minutes(Math.floor(time / 60));
        this.seconds(Math.round(time - this.minutes() * 60));

        this.duration(Math.round(this.aud.duration));

        this.isPlay(true);
        this.isPause(false);
        this.isSpinner(false);
        this.checkPlay(false);

        this.playSong();
    });

    checkUpdateTime = this.aud.addEventListener("timeupdate", () => {
        if (this.aud.currentTime == this.aud.duration && !this.sttLoop()) {
            this.pauseSong();
        }
        let currentTime = this.aud.currentTime;
        let currentTimeHours = Math.floor(currentTime / 3600);
        let currentTimeLine = currentTime - currentTimeHours * 3600;
        let currentTimeMinutes = Math.floor(currentTimeLine / 60);
        let currentTimeSeconds = Math.round(currentTimeLine - currentTimeMinutes * 60);

        let strH = '';
        let strM = '00:';
        let strS = '00';
        if (currentTimeHours != 0) {
            if (currentTimeHours < 10) {
                strH = "0" + currentTimeHours + ":";
            } else {
                strH = currentTimeHours + ":";
            }
        }

        if (currentTimeMinutes != 0) {
            if (currentTimeMinutes < 10) {
                strM = "0" + currentTimeMinutes + ":";
            } else {
                strM = currentTimeMinutes + ":";
            }
        } else {
            strM = '00:';
        }

        if (currentTimeSeconds != 0) {
            if (currentTimeSeconds < 10) {
                strS = "0" + currentTimeSeconds;
            } else {
                strS = '' + currentTimeSeconds;
            }
        } else {
            strS = '00';
        }

        this.strLine(strH + strM + strS);

        this.aud.volume = this.changeVolume() / 100;
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

    isRandom() {
        if (this.sttRandom()) {
            this.sttRandom(false);

        } else {
            this.sttRandom(true);

        }
    }

    playSong() {
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
                }).then((response) => {
                    return response.json();
                }).then((dataRes) => {
                    if (dataRes.message == 'success') {
                        arr.push({
                            id_gg: sessionStorage.getItem("id_gg") ? sessionStorage.getItem("id_gg") : '17ZUjG5iqEB-vMWaLEnmxNE4SMzzusxeX',
                            is_like: true,
                            singer: sessionStorage.getItem("name_singer") ? sessionStorage.getItem("name_singer") : 'Jack',
                            nameSong: sessionStorage.getItem("name_song") ? sessionStorage.getItem("name_song") : 'Là 1 Thằng Con Trai',
                            imgSong: sessionStorage.getItem("img_song") ? sessionStorage.getItem("img_song") : '../../assets/images/mqdefault_2.jpg'
                        });
                    } else {
                        arr.push({
                            id_gg: sessionStorage.getItem("id_gg") ? sessionStorage.getItem("id_gg") : '17ZUjG5iqEB-vMWaLEnmxNE4SMzzusxeX',
                            is_like: false,
                            singer: sessionStorage.getItem("name_singer") ? sessionStorage.getItem("name_singer") : 'Jack',
                            nameSong: sessionStorage.getItem("name_song") ? sessionStorage.getItem("name_song") : 'Là 1 Thằng Con Trai',
                            imgSong: sessionStorage.getItem("img_song") ? sessionStorage.getItem("img_song") : '../../assets/images/mqdefault_2.jpg'
                        });
                    }
                    this.itemSongHistory(this.itemSongHistory().concat(arr));
                    sessionStorage.setItem("arrHistory", JSON.stringify(this.itemSongHistory()));

                    this.itemSongHistory(JSON.parse(sessionStorage.getItem("arrHistory")));
                });
            }

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


    showModalBottom() {
        if (this.checkShowModalBottom()) {
            this.checkShowModalBottom(false);
        } else {
            this.checkShowModalBottom(true);
        }
    }



    keySongRanDom = ko.observable(0);
    isForward() {
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
    }

    isBackward() {
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
            }).then((response) => {
                return response.json();
            }).then((dataRes) => {
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
    }

    getData = fetch(global.api_url + 'get_ramdom_song', {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id_user: sessionStorage.getItem("id_user") ? sessionStorage.getItem("id_user") : 0 })
    }).then((response) => {
        return response.json();
    }).then((data) => {
        var objItemNew = [];
        data.dataSongNew.map(function (value) {
            objItemNew.push({ id: value.id, is_like: value.is_like, name: value.name, id_gg: value.id_gg, image: value.image, date_create: value.date_create, id_singer: value.id_singer, text_gr_singer: value.text_gr_singer });
        });
        this.itemSong(objItemNew);

        if (!sessionStorage.getItem("url_song")) {
            this.changeLinkModal(this.itemSong()[0]['id_gg'], this.itemSong()[0]['text_gr_singer'], this.itemSong()[0]['name'], '../../assets/images' + this.itemSong()[0]['image']);
        }
    });

    addHeartModal(data, id_song, event) {
        if (!sessionStorage.getItem('id_user')) {
            Swal.fire({
                title: '<strong>Vui lòng đăng nhập để thực hiện chức năng này!</strong>',
                icon: 'warning',
                showCloseButton: true,
                focusConfirm: false,
                confirmButtonText: 'Ok!'
            });
        } else {
            fetch(global.api_url + 'add_like_byURL', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ url: data, id_user: sessionStorage.getItem('id_user') })
            }).then((response) => {
                return response.json();
            }).then((dataRes) => {
                if (dataRes.message == 'success') {
                    event.currentTarget.className += " heart_active";
                } else if (dataRes.message == 'delete') {
                    event.currentTarget.className = "icon_action_song";
                }
            });
        }
    }

    setIsMobile = ko.observable(false);
    openBottom() {
        var widthClient = document.documentElement.clientWidth;
        if (widthClient < 480) {
            this.setIsMobile(true);
        }
    }
    closeBottom() {
        this.setIsMobile(false);
    }
}