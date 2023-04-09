import ko = require('knockout');
import $ = require('jquery');

export = class home {
    bannerSlide = ko.observableArray([
        { src: "../../assets/images/banner-template.jpg", id: 1 },
        { src: "../../assets/images/banner-template2.jpg", id: 2 },
        { src: "../../assets/images/banner-template3.jpg", id: 3 },
        { src: "../../assets/images/banner-template4.jpg", id: 4 },
        { src: "../../assets/images/banner-template5.jpg", id: 5 }
    ]);

    setTime = 5;
    setTimeSinger = 5;
    nextSlide() {
        this.bannerSlide.push(this.bannerSlide.shift());
        this.setTime = 5;
    };

    prevSlide() {
        this.bannerSlide.unshift(this.bannerSlide.pop());
        this.setTime = 5;
    };

    timer: ReturnType<typeof setInterval> = setInterval(() => {
        this.checkTime(this.setTime);
        this.checkTimeSinger(this.setTimeSinger);
    }, 1000);

    checkTime(time) {
        if (time == 0) {
            this.nextSlide();
            this.setTime = 5;
        } else {
            this.setTime = time - 1;
        }
    }

    bannerSinger = ko.observableArray();
    nextSinger() {
        this.bannerSinger.push(this.bannerSinger.shift());
        this.setTimeSinger = 5;
    };

    prevSinger() {
        this.bannerSinger.unshift(this.bannerSinger.pop());
        this.setTimeSinger = 5;
    };

    checkTimeSinger(time) {
        if (time == 0) {
            this.nextSinger();
            this.setTimeSinger = 5;
        } else {
            this.setTimeSinger = time - 1;
        }
    }

    itemSongNew = ko.observableArray();
    itemPlaylist = ko.observableArray();
    itemSongHot = ko.observableArray();
    getData = fetch('http://localhost:8080/music/get_DataSong', {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id_user: 0 })
    }).then((response) => {
        return response.json();
    }).then((data) => {
        var objItemNew = [];
        data.dataSongNew.map(function (value) {
            objItemNew.push({ id: value.id, name: value.name, id_gg: value.id_gg, image: '../../assets/images'+value.image, date_create: value.date_create, id_singer: value.id_singer, text_gr_singer: value.text_gr_singer });
        });
        this.itemSongNew(objItemNew);

        var objPlaylist = [];
        data.dataPlaylist.map(function (value) {
            objPlaylist.push({ id: value.id, name: value.name, img: value.img, create_by: 'Được tạo bởi '+value.create_by });
        });
        this.itemPlaylist(objPlaylist);

        var objPlaySinger = [];
        data.dataSinger_hot.map(function (value) {
            objPlaySinger.push({ name: value.name, img: '../../assets/images' + value.img, id: value.id });
        });
        this.bannerSinger(objPlaySinger);

        var objSongHot = [];
        data.dataSongHot.map(function (value) {
            objSongHot.push({ id: value.id, is_like: value.is_like, name: value.name, id_gg: value.id_gg, image: '../../assets/images' + value.image, date_create: value.date_create, id_singer: value.id_singer, text_gr_singer: value.text_gr_singer });
        });
        this.itemSongHot(objSongHot);
    });



    changeLink(id_gg, singer, nameSong, imgSong) {
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
}