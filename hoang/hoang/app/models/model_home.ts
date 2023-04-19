import global = require('../../assets/js/global');

export = class model_home {
    bannerSlide() {
        return [
            { src: "../../assets/images/banner-template.jpg", id: 1 },
            { src: "../../assets/images/banner-template2.jpg", id: 2 },
            { src: "../../assets/images/banner-template3.jpg", id: 3 },
            { src: "../../assets/images/banner-template4.jpg", id: 4 },
            { src: "../../assets/images/banner-template5.jpg", id: 5 }
        ];
    }
    async getDataSong(id_user) {
        return fetch(`${global.api_url}get_DataSong`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id_user: id_user })
        }).then((response) => {
            return response.json();
        }).then((data) => {
            let objItemNew: global.infoSongs = [];
            data.dataSongNew.map((value) => {
                objItemNew.push({ id: value.id, is_like: value.is_like, name: value.name, id_gg: value.id_gg, image: '../../assets/images' + value.image, date_create: value.date_create, id_singer: value.id_singer, text_gr_singer: value.text_gr_singer });
            });

            let objPlaylist: global.infoPlaylists = [];
            data.dataPlaylist.map((value) => {
                objPlaylist.push({ id: value.id, is_like: value.is_like, name: value.name, img: value.img, create_by: 'Được tạo bởi ' + value.create_by });
            });

            let objPlaySinger = [];
            data.dataSinger_hot.map((value) => {
                objPlaySinger.push({ name: value.name, img: '../../assets/images' + value.img, id: value.id });
            });

            let objSongHot: global.infoSongs = [];
            data.dataSongHot.map((value) => {
                objSongHot.push({ id: value.id, is_like: value.is_like, name: value.name, id_gg: value.id_gg, image: '../../assets/images' + value.image, date_create: value.date_create, id_singer: value.id_singer, text_gr_singer: value.text_gr_singer });
            });
            return JSON.stringify({
                valueObjItemNew: objItemNew,
                valueObjPlaylist: objPlaylist,
                valueObjPlaySinger: objPlaySinger,
                valueObjSongHot: objSongHot,
            });
        });
    }

    async addLike(id, id_user) {
        return fetch(`${global.api_url}add_like`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: id, id_user: id_user })
        }).then((response) => {
            return response.json();
        }).then((data) => {
            if (data.message == 'success') {
                return "success";
            } else if (data.message == 'delete') {
                return "fail";
            }
        });
    }

    async addPlaylist(id, id_user) {
        return fetch(`${global.api_url}add_like_playlist`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: id, id_user: id_user })
        }).then((response) => {
            return response.json();
        }).then((data) => {
            if (data.message == 'success') {
                return "success";
            } else if (data.message == 'delete') {
                return "fail";
            }
        });
    }
}
