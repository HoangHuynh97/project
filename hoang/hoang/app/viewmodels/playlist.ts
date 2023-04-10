import m_router = require('../../lib/durandal/js/plugins/router');
import ko = require('knockout');
import $ = require('jquery');

export = class home {
    itemSong = ko.observableArray();
    param = m_router.activeInstruction().params[0];
    NamePlaylist = ko.observable('');
    NameCreateBy = ko.observable('');
    ArrIMG = ko.observable('');

    getData = fetch('http://localhost:8080/music/get_Playlist', {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id_playlist: this.param })
    }).then((response) => {
        return response.json();
    }).then((data) => {
        if (!data || data.length == 0) {
            window.location.href = '#';
        }

        this.NamePlaylist(data.dataPlaylist.name);
        this.NameCreateBy(data.dataPlaylist.create_by);
        this.ArrIMG(data.dataPlaylist.img);

        var objItemNew = [];
        data.dataSongbyPlaylist.map(function (value) {
            objItemNew.push({ name: value.name, id_gg: value.id_gg, image: value.image, date_create: value.date_create, id_singer: value.id_singer, text_gr_singer: value.text_gr_singer });
        });
        this.itemSong(objItemNew);
    });
}