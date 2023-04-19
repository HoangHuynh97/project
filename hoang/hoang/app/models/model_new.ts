import global = require('../../assets/js/global');

export = class model_new {
    async getDataSong(id_user, isStart, loadMore) {
        return fetch(`${global.api_url}get_DataNew`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id_user: id_user, isStart: isStart, loadMore: loadMore })
        }).then((response) => {
            return response.json();
        }).then((data) => {
            let objItemNew: global.infoSongs = [];
            data.dataSongNew.map((value) => {
                objItemNew.push({ id: value.id, is_like: value.is_like, name: value.name, id_gg: value.id_gg, image: '../../assets/images' + value.image, date_create: value.date_create, id_singer: value.id_singer, text_gr_singer: value.text_gr_singer });
            });
            return JSON.stringify({
                valueObjItemNew: objItemNew
            });
        });
    }

    async loadMore(id_user, isStart, loadMore) {
        return fetch(`${global.api_url}get_DataNew`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id_user: id_user, isStart: isStart, loadMore: loadMore })
        }).then((response) => {
            return response.json();
        }).then((data) => {
            let objItemNew: global.infoSongs = [];
            data.dataSongNew.map((value) => {
                objItemNew.push({ id: value.id, is_like: value.is_like, name: value.name, id_gg: value.id_gg, image: '../../assets/images' + value.image, date_create: value.date_create, id_singer: value.id_singer, text_gr_singer: value.text_gr_singer });
            });
            return JSON.stringify({
                valueObjItemNew: objItemNew
            });
        });
    }

    async addHeart(id, id_user) {
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
}
