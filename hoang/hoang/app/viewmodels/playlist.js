define(["require", "exports", "../../lib/durandal/js/plugins/router", "knockout"], function (require, exports, m_router, ko) {
    "use strict";
    return /** @class */ (function () {
        function home() {
            var _this = this;
            this.itemSong = ko.observableArray();
            this.param = m_router.activeInstruction().params[0];
            this.NamePlaylist = ko.observable('');
            this.NameCreateBy = ko.observable('');
            this.ArrIMG = ko.observable('');
            this.getData = fetch('http://localhost:8080/music/get_Playlist', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id_playlist: this.param })
            }).then(function (response) {
                return response.json();
            }).then(function (data) {
                if (!data || data.length == 0) {
                    window.location.href = '#';
                }
                _this.NamePlaylist(data.dataPlaylist.name);
                _this.NameCreateBy(data.dataPlaylist.create_by);
                _this.ArrIMG(data.dataPlaylist.img);
                var objItemNew = [];
                data.dataSongbyPlaylist.map(function (value) {
                    objItemNew.push({ name: value.name, id_gg: value.id_gg, image: value.image, date_create: value.date_create, id_singer: value.id_singer, text_gr_singer: value.text_gr_singer });
                });
                _this.itemSong(objItemNew);
            });
        }
        return home;
    }());
});
//# sourceMappingURL=playlist.js.map