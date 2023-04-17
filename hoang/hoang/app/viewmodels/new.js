define(["require", "exports", "knockout", "../../lib/sweetalert2/dist/sweetalert2.all.min", "../models/model_new"], function (require, exports, ko, Swal, model_new) {
    "use strict";
    return /** @class */ (function () {
        function class_1() {
            var _this = this;
            this.getModel_new = new model_new();
            this.hiddenLoading = ko.observable(false);
            this.isStart = ko.observable(0);
            this.itemSong = ko.observableArray();
            this.sttLoadmore = ko.observable(true);
            this.getData = this.getModel_new.getDataSong(sessionStorage.getItem('id_user') ? sessionStorage.getItem('id_user') : 0, this.isStart(), 20).then(function (response) {
                response = JSON.parse(response);
                _this.itemSong(response['valueObjItemNew']);
                _this.isStart(_this.isStart() + 20);
                setTimeout(function () {
                    _this.hiddenLoading(true);
                }, 1500);
            });
        }
        class_1.prototype.loadMore = function () {
            var _this = this;
            this.hiddenLoading(false);
            this.getModel_new.getDataSong(sessionStorage.getItem('id_user') ? sessionStorage.getItem('id_user') : 0, this.isStart(), 20).then(function (response) {
                response = JSON.parse(response);
                _this.itemSong(_this.itemSong().concat(response['valueObjItemNew']));
                _this.isStart(_this.isStart() + 20);
                if (_this.isStart() == 100) {
                    _this.sttLoadmore(false);
                }
                setTimeout(function () {
                    _this.hiddenLoading(true);
                }, 1500);
            });
        };
        ;
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
                this.getModel_new.addHeart(data, sessionStorage.getItem('id_user')).then(function (response) {
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
        return class_1;
    }());
});
//# sourceMappingURL=new.js.map