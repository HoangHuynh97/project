import ko = require('knockout');
import $ = require('jquery');

export = class home {
    bannerSlide = ko.observableArray([
        { src: "../../assets/images/am-nhac.jpg", id: 1 },
        { src: "../../assets/images/am-nhac.jpg", id: 2 },
        { src: "../../assets/images/am-nhac.jpg", id: 3 },
        { src: "../../assets/images/am-nhac.jpg", id: 4 },
        { src: "../../assets/images/am-nhac.jpg", id: 5 }
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


    bannerSinger = ko.observableArray([
        { src: "../../assets/images/am-nhac.jpg", id: 1 },
        { src: "../../assets/images/am-nhac.jpg", id: 2 },
        { src: "../../assets/images/am-nhac.jpg", id: 3 },
        { src: "../../assets/images/am-nhac.jpg", id: 4 },
        { src: "../../assets/images/am-nhac.jpg", id: 5 },
        { src: "../../assets/images/am-nhac.jpg", id: 6 },
        { src: "../../assets/images/am-nhac.jpg", id: 7 },
        { src: "../../assets/images/am-nhac.jpg", id: 8 },
        { src: "../../assets/images/am-nhac.jpg", id: 9 },
        { src: "../../assets/images/am-nhac.jpg", id: 10 }
    ]);


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
    
    getData = fetch('http://localhost/music/get_DataSong', {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id_user: 0 })
    }).then((response) => {
        return response.json();
    }).then((data) => {
        var objX = [];
        data.dataSongNew.map(function (value) {
            objX.push({ id: value.id, name: value.name, id_gg: value.id_gg, image: '../../assets/images'+value.image, date_create: value.date_create, id_singer: value.id_singer, text_gr_singer: value.text_gr_singer });
        });
        this.itemSongNew(objX);
    });
}