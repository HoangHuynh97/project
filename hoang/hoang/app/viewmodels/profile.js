define(["require", "exports", "knockout"], function (require, exports, ko) {
    "use strict";
    return /** @class */ (function () {
        function home() {
            var _this = this;
            this.itemSong = ko.observableArray();
            this.itemSongLike = ko.observableArray();
            this.itemSongLikePlaylist = ko.observableArray();
            this.isTab = ko.observable(1);
            this.getData = fetch('http://localhost:8080/music/get_DataProfile', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id_user: sessionStorage.getItem("id_user") })
            }).then(function (response) {
                return response.json();
            }).then(function (data) {
                var objItemNew = [];
                data.dataPlaylist.map(function (value) {
                    objItemNew.push({ name: value.name, id: value.id, img: value.img, create_by: value.create_by });
                });
                _this.itemSong(objItemNew);
                var objItemLike = [];
                data.dataSongLike.map(function (value) {
                    objItemLike.push({ id: value.id, name: value.name, id_gg: value.id_gg, image: '../../assets/images' + value.image, date_create: value.date_create, id_singer: value.id_singer, text_gr_singer: value.text_gr_singer });
                });
                _this.itemSongLike(objItemLike);
                var objItemLikePlaylist = [];
                data.dataPlaylistLike.map(function (value) {
                    objItemLikePlaylist.push({ name: value.name, is_like: value.is_like, id: value.id, img: value.img, create_by: value.create_by });
                });
                _this.itemSongLikePlaylist(objItemLikePlaylist);
            });
        }
        home.prototype.changeViewTab = function (data, key) {
            if (data == 1) {
                this.isTab(1);
            }
            else if (data == 2) {
                this.isTab(2);
            }
            else if (data == 3) {
                this.isTab(3);
            }
        };
        return home;
    }());
});
//# sourceMappingURL=profile.js.map