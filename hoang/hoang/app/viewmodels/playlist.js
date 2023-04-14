define(["require", "exports", "../../lib/durandal/js/plugins/router", "knockout", "../../lib/sweetalert2/dist/sweetalert2.all.min", "../../assets/js/global"], function (require, exports, m_router, ko, Swal, global) {
    "use strict";
    return /** @class */ (function () {
        function home() {
            var _this = this;
            this.hiddenLoading = ko.observable(false);
            this.itemSong = ko.observableArray();
            this.param = m_router.activeInstruction().params[0];
            this.NamePlaylist = ko.observable('');
            this.NameCreateBy = ko.observable('');
            this.ArrIMG = ko.observable('');
            this.getData = fetch(global.api_url + 'get_Playlist', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id_playlist: this.param, id_user: sessionStorage.getItem('id_user') ? sessionStorage.getItem('id_user') : 0 })
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
                    objItemNew.push({ id: value.id, name: value.name, is_like: value.is_like, id_gg: value.id_gg, image: value.image, date_create: value.date_create, id_singer: value.id_singer, text_gr_singer: value.text_gr_singer });
                });
                _this.itemSong(objItemNew);
                setTimeout(function () {
                    _this.hiddenLoading(true);
                }, 1500);
            });
        }
        home.prototype.addHeart = function (data, id_song, event) {
            if (!sessionStorage.getItem('id_user')) {
                Swal.fire({
                    title: '<strong>Vui lòng đăng nhập để thực hiện chức năng này!</strong>',
                    icon: 'warning',
                    showCloseButton: true,
                    focusConfirm: false,
                    confirmButtonText: 'Ok!'
                });
            }
            else {
                fetch(global.api_url + 'add_like', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json, text/plain, */*',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ id: data, id_user: sessionStorage.getItem('id_user') })
                }).then(function (response) {
                    return response.json();
                }).then(function (dataRes) {
                    if (dataRes.message == 'success') {
                        event.currentTarget.className += " heart_active";
                    }
                    else if (dataRes.message == 'delete') {
                        event.currentTarget.className = "sc_icon_table";
                    }
                });
            }
        };
        home.prototype.changeLink = function (id_gg, singer, nameSong, imgSong) {
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
        };
        home.prototype.randomPlay = function () {
            sessionStorage.removeItem("arrHistory");
            var arr = [];
            this.itemSong().map(function (value) {
                arr.push({
                    id_gg: value['id_gg'],
                    is_like: false,
                    singer: value['text_gr_singer'],
                    nameSong: value['name'],
                    imgSong: '../../assets/images' + value['image']
                });
            });
            sessionStorage.setItem("arrHistory", JSON.stringify(arr));
            sessionStorage.setItem("checkPlayIsRandom", '1');
            if (sessionStorage.getItem("url_song") != '') {
                sessionStorage.removeItem("url_song");
                sessionStorage.removeItem("id_gg");
                sessionStorage.removeItem("name_singer");
                sessionStorage.removeItem("name_song");
                sessionStorage.removeItem("img_song");
            }
            sessionStorage.setItem("url_song", 'https://docs.google.com/uc?export=download&id=' + this.itemSong()[0]['id_gg']);
            sessionStorage.setItem("id_gg", this.itemSong()[0]['id_gg']);
            sessionStorage.setItem("name_singer", this.itemSong()[0]['text_gr_singer']);
            sessionStorage.setItem("name_song", this.itemSong()[0]['name']);
            sessionStorage.setItem("img_song", '../../assets/images' + this.itemSong()[0]['image']);
            window.dispatchEvent(new Event("storage"));
        };
        return home;
    }());
});
//# sourceMappingURL=playlist.js.map