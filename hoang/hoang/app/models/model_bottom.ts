import global = require('../../assets/js/global');

export = class model_bottom {
    async getDataSong(id_user) {
        return fetch(`${global.api_url}get_ramdom_song`, {
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
                objItemNew.push({ id: value.id, is_like: value.is_like, name: value.name, id_gg: value.id_gg, image: value.image, date_create: value.date_create, id_singer: value.id_singer, text_gr_singer: value.text_gr_singer });
            });
            return JSON.stringify({
                valueObjItemNew: objItemNew
            });
        });
    }

    async checkLike(url, id_user) {
        return fetch(`${global.api_url}check_like`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                url: url,
                id_user: id_user
            })
        }).then((response) => {
            return response.json();
        }).then((data) => {
            if (data.message == 'success') {
                return "success";
            } else {
                return "fail";
            }
        });
    }

    async getSongByUrl(url, id_user) {
        return fetch(`${global.api_url}get_song_by_url`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                url: url,
                id_user: id_user
            })
        }).then((response) => {
            return response.json();
        }).then((data) => {
            return JSON.stringify({
                id_gg: data.dataSongNew[0]['id_gg'],
                text_gr_singer: data.dataSongNew[0]['text_gr_singer'],
                name: data.dataSongNew[0]['name'],
                image: '../../assets/images' + data.dataSongNew[0]['image']
            });
        });
    }

    async addHeartModal(url, id_user) {
        return fetch(`${global.api_url}add_like_byURL`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                url: url,
                id_user: id_user
            })
        }).then((response) => {
            return response.json();
        }).then((data) => {
            if (data.message == 'success') {
                return "success";
            } else {
                return "fail";
            }
        });
    }
}
