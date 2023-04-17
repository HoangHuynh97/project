var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
define(["require", "exports", "../../assets/js/global"], function (require, exports, global) {
    "use strict";
    return /** @class */ (function () {
        function model_home() {
        }
        model_home.prototype.bannerSlide = function () {
            return [
                { src: "../../assets/images/banner-template.jpg", id: 1 },
                { src: "../../assets/images/banner-template2.jpg", id: 2 },
                { src: "../../assets/images/banner-template3.jpg", id: 3 },
                { src: "../../assets/images/banner-template4.jpg", id: 4 },
                { src: "../../assets/images/banner-template5.jpg", id: 5 }
            ];
        };
        model_home.prototype.getDataSong = function (id_user) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, fetch("".concat(global.api_url, "get_DataSong"), {
                            method: 'POST',
                            headers: {
                                'Accept': 'application/json, text/plain, */*',
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ id_user: id_user })
                        }).then(function (response) {
                            return response.json();
                        }).then(function (data) {
                            var objItemNew = [];
                            data.dataSongNew.map(function (value) {
                                objItemNew.push({ id: value.id, is_like: value.is_like, name: value.name, id_gg: value.id_gg, image: '../../assets/images' + value.image, date_create: value.date_create, id_singer: value.id_singer, text_gr_singer: value.text_gr_singer });
                            });
                            var objPlaylist = [];
                            data.dataPlaylist.map(function (value) {
                                objPlaylist.push({ id: value.id, is_like: value.is_like, name: value.name, img: value.img, create_by: 'Được tạo bởi ' + value.create_by });
                            });
                            var objPlaySinger = [];
                            data.dataSinger_hot.map(function (value) {
                                objPlaySinger.push({ name: value.name, img: '../../assets/images' + value.img, id: value.id });
                            });
                            var objSongHot = [];
                            data.dataSongHot.map(function (value) {
                                objSongHot.push({ id: value.id, is_like: value.is_like, name: value.name, id_gg: value.id_gg, image: '../../assets/images' + value.image, date_create: value.date_create, id_singer: value.id_singer, text_gr_singer: value.text_gr_singer });
                            });
                            return JSON.stringify({
                                valueObjItemNew: objItemNew,
                                valueObjPlaylist: objPlaylist,
                                valueObjPlaySinger: objPlaySinger,
                                valueObjSongHot: objSongHot,
                            });
                        })];
                });
            });
        };
        model_home.prototype.addLike = function (id, id_user) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, fetch("".concat(global.api_url, "add_like"), {
                            method: 'POST',
                            headers: {
                                'Accept': 'application/json, text/plain, */*',
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ id: id, id_user: id_user })
                        }).then(function (response) {
                            return response.json();
                        }).then(function (data) {
                            if (data.message == 'success') {
                                return "success";
                            }
                            else if (data.message == 'delete') {
                                return "fail";
                            }
                        })];
                });
            });
        };
        model_home.prototype.addPlaylist = function (id, id_user) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, fetch("".concat(global.api_url, "add_like_playlist"), {
                            method: 'POST',
                            headers: {
                                'Accept': 'application/json, text/plain, */*',
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ id: id, id_user: id_user })
                        }).then(function (response) {
                            return response.json();
                        }).then(function (data) {
                            if (data.message == 'success') {
                                return "success";
                            }
                            else if (data.message == 'delete') {
                                return "fail";
                            }
                        })];
                });
            });
        };
        return model_home;
    }());
});
//# sourceMappingURL=model_home.js.map