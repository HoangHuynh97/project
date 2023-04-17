import global = require('../../assets/js/global');

export = class model_playlist {
    async getDataSong(id_playlist, id_user) {
        return fetch(`${global.api_url}get_Playlist`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id_playlist: id_playlist, id_user: id_user })
        }).then((response) => {
            return response.json();
        }).then((data) => {
            if (!data || data.length == 0) {
                window.location.href = '#';
            }

            let objItemNew = [];
            data.dataSongbyPlaylist.map((value) => {
                objItemNew.push({ id: value.id, name: value.name, is_like: value.is_like, id_gg: value.id_gg, image: value.image, date_create: value.date_create, id_singer: value.id_singer, text_gr_singer: value.text_gr_singer });
            });
            return JSON.stringify({
                namePlaylist: data.dataPlaylist.name,
                nameCreateBy: data.dataPlaylist.create_by,
                ArrIMG: data.dataPlaylist.img,
                valueObjItemNew: objItemNew
            });
        });
    }
}
