import global = require('../../assets/js/global');

export = class model_menu {
    async searchSongByName(key_search) {
        return fetch(`${global.api_url}search_song_byName`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ key_search: key_search })
        }).then((response) => {
            return response.json();
        }).then((data) => {
            let objItemSearchInput = [];
            if (data.dataSongSearch) {
                data.dataSongSearch.map((value) => {
                    objItemSearchInput.push({ id: value.id, name: value.name });
                });
            }
            return JSON.stringify({
                valueObjItemSearchInput: objItemSearchInput
            });
        });
    }

    async addPlaylist(name, id_user_create, value_song) {
        return fetch(`${global.api_url}add_playlist`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: name, id_user_create: id_user_create, value_song: value_song })
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
