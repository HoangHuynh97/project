import m_router = require('../../lib/durandal/js/plugins/router');
import m_system = require('../../lib/durandal/js/system');
import ko = require('knockout');
import $ = require('jquery');
import Swal = require('../../lib/sweetalert2/dist/sweetalert2.all.min');
import global = require('../../assets/js/global');

export = class {
    router = m_router;
    activate = function () {
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

    setIsSelected = ko.observable(false);
    isPlay = ko.observable(true);
    isPause = ko.observable(false);
    isSpinner = ko.observable(false);
    checkPlay = ko.observable(false);
    checkShowModalUpload = ko.observable(false);
    checkShowModalAddPlaylist = ko.observable(false);
    isLogin = ko.observable(sessionStorage.getItem("name_user") ? true : false);

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
    strLine = ko.observable('00:00');
    sttLoop = ko.observable(false);
    sttRandom = ko.observable(false);
    isURL = ko.observable(sessionStorage.getItem("isURL") ? sessionStorage.getItem("isURL") : '#');
    changeVolume = ko.observable(100);
    checkShowModalBottom = ko.observable(false);
    itemSong = ko.observableArray();
    isCheckPlaying = sessionStorage.getItem("id_gg") ? [sessionStorage.getItem("id_gg")] : [];

    id_gg = ko.observable(sessionStorage.getItem("id_gg") ? sessionStorage.getItem("id_gg") : '');
    singer = ko.observable(sessionStorage.getItem("name_singer") ? sessionStorage.getItem("name_singer") : '');
    nameSong = ko.observable(sessionStorage.getItem("name_song") ? sessionStorage.getItem("name_song") : '');
    imgSong = ko.observable(sessionStorage.getItem("img_song") ? sessionStorage.getItem("img_song") : '');

    itemSongHistory = ko.observableArray(sessionStorage.getItem("arrHistory") ? JSON.parse(sessionStorage.getItem("arrHistory")) : []);

    isUser = ko.observable(sessionStorage.getItem("name_user") ? sessionStorage.getItem("name_user").charAt(0) : '');

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
        if (this.aud.currentTime == this.aud.duration && !this.sttLoop()) {
            this.pauseSong();
        }
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
        } else {
            this.strM('00:');
        }

        if (this.currentTimeSeconds() != 0) {
            if (this.currentTimeSeconds() < 10) {
                this.strS("0" + this.currentTimeSeconds());
            } else {
                this.strS('' + this.currentTimeSeconds());
            }
        } else {
            this.strS('00');
        }

        this.strLine(this.strH() + this.strM() + this.strS());

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

    isLogout() {
        sessionStorage.removeItem("id_user");
        sessionStorage.removeItem("name_user");
        this.isLogin(false);
        this.isUser('');
    }

    getURL(url) {
        if (url == '#profile') {
            if (!sessionStorage.getItem('id_user')) {
                Swal.fire({
                    title: '<strong>Vui lòng đăng nhập để thực hiện chức năng này!</strong>',
                    icon: 'warning',
                    showCloseButton: true,
                    focusConfirm: false,
                    confirmButtonText: 'Ok!'
                });
                return false;
            }
        }
        this.isURL(url);
        sessionStorage.setItem("isURL", url);
        window.location.href = this.isURL();
    }

    showModalBottom() {
        if (this.checkShowModalBottom()) {
            this.checkShowModalBottom(false);
        } else {
            this.checkShowModalBottom(true);
        }
    }

    showModalUpload() {
        this.checkShowModalUpload(true);
    }
    hiddenModalUpload() {
        this.checkShowModalUpload(false);
    }

    showModalAddPlaylist() {
        if (!sessionStorage.getItem('id_user')) {
            Swal.fire({
                title: '<strong>Vui lòng đăng nhập để thực hiện chức năng này!</strong>',
                icon: 'warning',
                showCloseButton: true,
                focusConfirm: false,
                confirmButtonText: 'Ok!'
            });
        } else {
            this.checkShowModalAddPlaylist(true);
        }
    }
    hiddenModalAddPlaylist() {
        this.checkShowModalAddPlaylist(false);
    }

    fileImage = ko.observable();
    data = new FormData();
    uploadImage(file) {
        this.data.append('image', file);
        this.fileImage(file);
    }

    valueNameSong = ko.observable('');
    valueSinger = ko.observable('');
    valueIDGG = ko.observable('');
    saveUploadSong() {
        if (this.valueNameSong() == '' || this.valueSinger() == '' || this.valueIDGG() == '' || !this.fileImage()) {
            Swal.fire({
                title: '<strong>Vui lòng nhập đầy đủ thông tin!</strong>',
                icon: 'warning',
                showCloseButton: true,
                focusConfirm: false,
                confirmButtonText: 'Ok!'
            });
        } else {
            this.data.append('song', this.valueNameSong());
            this.data.append('singer', this.valueSinger());
            this.data.append('gg', this.valueIDGG());
            fetch(global.api_url + 'upload_song', {
                method: 'POST',
                body: this.data
            }).then((response) => {
                return response.json();
            }).then((dataRes) => {
                if (dataRes.message == 'fail') {
                    Swal.fire({
                        title: '<strong>Hệ thống xảy ra lỗi, vui lòng thử lại sau!</strong>',
                        icon: 'error',
                        showCloseButton: true,
                        focusConfirm: false,
                        confirmButtonText: 'Ok!'
                    });
                } else {
                    Swal.fire({
                        title: '<strong>Thêm bài hát mới thành công!</strong>',
                        icon: 'success',
                        showCloseButton: true,
                        focusConfirm: false,
                        confirmButtonText: 'Ok!'
                    });
                    this.checkShowModalUpload(false);
                }
            });
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
            this.keySongRanDom(this.keySongRanDom()+1);
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

    sttInputSearch = ko.observable(false);
    valueNamePlaylist = ko.observable('');
    saved_value = ko.observable('');
    itemSongSearchInput = ko.observableArray();
    value_changed() {
        if (this.saved_value() != '') {
            fetch(global.api_url + 'search_song_byName', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ key_search: this.saved_value() })
            }).then((response) => {
                return response.json();
            }).then((data) => {
                if (data.dataSongSearch) {
                    var objItemSearchInput = [];
                    data.dataSongSearch.map(function (value) {
                        objItemSearchInput.push({ id: value.id, name: value.name });
                    });
                    this.itemSongSearchInput(objItemSearchInput);
                } else {
                    this.itemSongSearchInput([{ id: 0, name: 'Không có dữ liệu!' }]);
                }
                this.sttInputSearch(true);
            });
        } else {
            this.sttInputSearch(false);
        }
    }
    addValueInput(name, data, e) {
        if (this.saved_value().indexOf('|') == -1) {
            if (name != 'Không có dữ liệu!') {
                this.saved_value(name + ' | ');
            }
        } else {
            if (name != 'Không có dữ liệu!') {
                this.saved_value(this.saved_value().replace(this.saved_value().slice(this.saved_value().lastIndexOf(' | ')), ' | '));
                this.saved_value(this.saved_value() + name + ' | ');
            }
        }
        this.sttInputSearch(false);
    }
    saveAddPlaylist() {
        if (!sessionStorage.getItem('id_user')) {
            Swal.fire({
                title: '<strong>Vui lòng đăng nhập để thực hiện chức năng này!</strong>',
                icon: 'warning',
                showCloseButton: true,
                focusConfirm: false,
                confirmButtonText: 'Ok!'
            });
        } else {
            fetch(global.api_url + 'add_playlist', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: this.valueNamePlaylist(), id_user_create: sessionStorage.getItem('id_user'), value_song: this.saved_value() })
            }).then((response) => {
                return response.json();
            }).then((data) => {
                if (data.message == 'success') {
                    Swal.fire({
                        title: '<strong>Thêm danh sách phát thành công!</strong>',
                        icon: 'success',
                        showCloseButton: true,
                        focusConfirm: false,
                        confirmButtonText: 'Ok!'
                    });
                } else {
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
    }

    valueSearch = ko.observable('');
    setArrSongSearch = ko.observableArray();
    setArrSingerSearch = ko.observableArray();
    setArrSongMainSearch = ko.observableArray();
    setIsSearch = ko.observable(false);

    valueSearch_changed() {
        if (this.valueSearch() != '') {
            fetch(global.api_url + 'search_song', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ key_search: this.valueSearch() })
            }).then((response) => {
                return response.json();
            }).then((data) => {
                if (data.length == 0) {
                    this.setIsSearch(false);
                    this.setArrSongSearch([]);
                    this.setArrSingerSearch([]);
                    this.setArrSongMainSearch([]);
                } else {
                    this.setIsSearch(true);
                    var itemSongSearch = [];
                    data.dataSongSearch.map(function (value) {
                        itemSongSearch.push({ name: value.name, id_gg: value.id_gg, image: value.image, date_create: value.date_create, id_singer: value.id_singer, text_gr_singer: value.text_gr_singer });
                    });
                    this.setArrSongSearch(itemSongSearch);

                    if (data.dataSingerSearch) {
                        var itemSingerSearch = [];
                        data.dataSingerSearch.map(function (value) {
                            itemSingerSearch.push({ name: value.name, id: value.id });
                        });
                        this.setArrSingerSearch(itemSingerSearch);
                    } else {
                        this.setArrSingerSearch([]);
                    }

                    var itemSongMainSearch = [];
                    data.dataSongMainSearch.map(function (value) {
                        itemSongMainSearch.push({ name: value.name, id_gg: value.id_gg, image: value.image, date_create: value.date_create, id_singer: value.id_singer, text_gr_singer: value.text_gr_singer });
                    });
                    this.setArrSongMainSearch(itemSongMainSearch);
                }
            });
        } else {
            this.setIsSearch(false);
            this.setArrSongSearch([]);
            this.setArrSingerSearch([]);
            this.setArrSongMainSearch([]);
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

    menuMobile = ko.observable(false);
    setIsMobile = ko.observable(false);
    setMenuMobile() {
        this.menuMobile(!this.menuMobile());
    }
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