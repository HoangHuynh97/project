define(["require", "exports", "knockout"], function (require, exports, ko) {
    "use strict";
    return /** @class */ (function () {
        function home() {
            var _this = this;
            this.bannerSlide = ko.observableArray([
                { src: "../../assets/images/am-nhac.jpg", id: 1 },
                { src: "../../assets/images/am-nhac.jpg", id: 2 },
                { src: "../../assets/images/am-nhac.jpg", id: 3 },
                { src: "../../assets/images/am-nhac.jpg", id: 4 },
                { src: "../../assets/images/am-nhac.jpg", id: 5 }
            ]);
            this.setTime = 5;
            this.setTimeSinger = 5;
            this.timer = setInterval(function () {
                _this.checkTime(_this.setTime);
                _this.checkTimeSinger(_this.setTimeSinger);
            }, 1000);
            this.bannerSinger = ko.observableArray([
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
            this.itemSongNew = ko.observableArray();
            this.getData = fetch('http://localhost/music/get_DataSong', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id_user: 0 })
            }).then(function (response) {
                return response.json();
            }).then(function (data) {
                var objX = [];
                data.dataSongNew.map(function (value) {
                    objX.push({ id: value.id, name: value.name, id_gg: value.id_gg, image: '../../assets/images' + value.image, date_create: value.date_create, id_singer: value.id_singer, text_gr_singer: value.text_gr_singer });
                });
                _this.itemSongNew(objX);
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
        return home;
    }());
});
//# sourceMappingURL=home.js.map