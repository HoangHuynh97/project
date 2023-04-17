define(["require", "exports", "../../lib/durandal/js/plugins/router", "knockout", "../../lib/sweetalert2/dist/sweetalert2.all.min", "../models/model_home", "../models/model_playlist"], function (require, exports, m_router, ko, Swal, model_home, model_playlist) {
    "use strict";
    return /** @class */ (function () {
        function class_1() {
            var _this = this;
            this.getModel_home = new model_home();
            this.getModel_playlist = new model_playlist();
            this.hiddenLoading = ko.observable(false);
            this.itemSong = ko.observableArray();
            this.param = m_router.activeInstruction().params[0];
            this.NamePlaylist = ko.observable('');
            this.NameCreateBy = ko.observable('');
            this.ArrIMG = ko.observable('');
            this.getData = this.getModel_playlist.getDataSong(this.param, sessionStorage.getItem('id_user') ? sessionStorage.getItem('id_user') : 0).then(function (response) {
                response = JSON.parse(response);
                _this.NamePlaylist(response['namePlaylist']);
                _this.NameCreateBy(response['nameCreateBy']);
                _this.ArrIMG(response['ArrIMG']);
                _this.itemSong(response['valueObjItemNew']);
                setTimeout(function () {
                    _this.hiddenLoading(true);
                }, 1500);
            });
        }
        class_1.prototype.addHeart = function (data, id_song, event) {
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
                this.getModel_home.addLike(data, sessionStorage.getItem('id_user')).then(function (response) {
                    if (response == 'success') {
                        event.currentTarget.className += " heart_active";
                    }
                    else if (response == 'fail') {
                        event.currentTarget.className = "sc_icon_table";
                    }
                });
            }
        };
        class_1.prototype.changeLink = function (id_gg, singer, nameSong, imgSong) {
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
        class_1.prototype.randomPlay = function () {
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
        return class_1;
    }());
});
//# sourceMappingURL=playlist.js.map