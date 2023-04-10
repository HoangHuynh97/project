define(["require", "exports", "../../lib/durandal/js/plugins/router", "knockout"], function (require, exports, m_router, ko) {
    "use strict";
    return /** @class */ (function () {
        function home() {
            var _this = this;
            this.itemSong = ko.observableArray();
            this.itemSongPlaylist = ko.observableArray();
            this.param = m_router.activeInstruction().params[0];
            this.dataNameSinger = ko.observable('');
            this.dataImgSinger = ko.observable('');
            this.getData = fetch('http://localhost:8080/music/get_Singer', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id_singer: this.param })
            }).then(function (response) {
                return response.json();
            }).then(function (data) {
                if (!data.dataNameSinger) {
                    window.location.href = '#';
                }
                _this.dataNameSinger(data.dataNameSinger);
                _this.dataImgSinger(data.dataImgSinger);
                var objItemNew = [];
                data.dataSongbySinger.map(function (value) {
                    objItemNew.push({ name: value.name, id_gg: value.id_gg, image: value.image, date_create: value.date_create, id_singer: value.id_singer, text_gr_singer: value.text_gr_singer });
                });
                _this.itemSong(objItemNew);
                var objItemPlaylist = [];
                data.dataPlaylist.map(function (value) {
                    objItemPlaylist.push({ id: value.id, name: value.name, img: value.img, create_by: value.create_by });
                });
                _this.itemSongPlaylist(objItemPlaylist);
            });
        }
        return home;
    }());
});
//# sourceMappingURL=singer.js.map