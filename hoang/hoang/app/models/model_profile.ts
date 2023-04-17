import global = require('../../assets/js/global');

export = class model_profile {
    async getDataSong(id_user) {
        return fetch(`${global.api_url}get_DataProfile`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id_user: id_user })
        }).then((response) => {
            return response.json();
        }).then((data) => {
            let objItemNew = [];
            if (data.dataPlaylist) {
                data.dataPlaylist.map(function (value) {
                    objItemNew.push({ name: value.name, is_like: value.is_like, id: value.id, img: value.img, create_by: value.create_by });
                });
            }

            let objItemLike = [];
            if (data.dataSongLike) {
                data.dataSongLike.map(function (value) {
                    objItemLike.push({ id: value.id, is_like: value.is_like, name: value.name, id_gg: value.id_gg, image: '../../assets/images' + value.image, date_create: value.date_create, id_singer: value.id_singer, text_gr_singer: value.text_gr_singer });
                });
            }

            let objItemLikePlaylist = [];
            if (data.dataPlaylistLike) {
                data.dataPlaylistLike.map(function (value) {
                    objItemLikePlaylist.push({ name: value.name, is_like: value.is_like, id: value.id, img: value.img, create_by: value.create_by });
                });
            }

            
            return JSON.stringify({
                valueObjItemNew: objItemNew,
                valueObjItemLike: objItemLike,
                valueObjItemLikePlaylist: objItemLikePlaylist
            });
        });
    }
}
