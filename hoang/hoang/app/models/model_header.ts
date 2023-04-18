import global = require('../../assets/js/global');

export = class model_header {
    async uploadSong(data) {
        console.log(data);
        return fetch(`${global.api_url}upload_song`, {
            method: 'POST',
            body: data
        }).then((response) => {
            return response.json();
        }).then((data) => {
            if (data.message == 'fail') {
                return "fail";
            } else {
                return "success";
            }
        });
    }

    async searchSong(key_search) {
        return fetch(`${global.api_url}search_song`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ key_search: key_search })
        }).then((response) => {
            return response.json();
        }).then((data) => {
            let itemSongSearch = [];
            let itemSingerSearch = [];
            let itemSongMainSearch = [];
            if (data.length != 0) {
                data.dataSongSearch.map((value) => {
                    itemSongSearch.push({ name: value.name, id_gg: value.id_gg, image: value.image, date_create: value.date_create, id_singer: value.id_singer, text_gr_singer: value.text_gr_singer });
                });
                if (data.dataSingerSearch) {
                    data.dataSingerSearch.map((value) => {
                        itemSingerSearch.push({ name: value.name, id: value.id });
                    });
                }
                data.dataSongMainSearch.map((value) => {
                    itemSongMainSearch.push({ name: value.name, id_gg: value.id_gg, image: value.image, date_create: value.date_create, id_singer: value.id_singer, text_gr_singer: value.text_gr_singer });
                });
            }
            return JSON.stringify({
                valueObjSongSearch: itemSongSearch,
                valueObjSingerSearch: itemSingerSearch,
                valueObjSongMainSearch: itemSongMainSearch
            });
        });
    }
}
