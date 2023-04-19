import global = require('../../assets/js/global');

export = class model_singer {
    async getDataSong(id_singer, id_user, ) {
        return fetch(`${global.api_url}get_Singer`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id_singer: id_singer, id_user: id_user })
        }).then((response) => {
            return response.json();
        }).then((data) => {
            if (!data.dataNameSinger) {
                window.location.href = '#';
            }
            let objItemNew: global.infoSongs = [];
            data.dataSongbySinger.map((value) => {
                objItemNew.push({ id: value.id, name: value.name, is_like: value.is_like, id_gg: value.id_gg, image: value.image, date_create: value.date_create, id_singer: value.id_singer, text_gr_singer: value.text_gr_singer });
            });
            let objItemPlaylist: global.infoPlaylists = [];
            data.dataPlaylist.map((value) => {
                objItemPlaylist.push({ id: value.id, is_like: value.is_like, name: value.name, img: value.img, create_by: value.create_by });
            });

            return JSON.stringify({
                dataNameSinger: data.dataNameSinger,
                dataImgSinger: data.dataImgSinger,
                valueSongbySinger: objItemNew,
                valuePlaylist: objItemPlaylist,
            });
        });
    }
}
