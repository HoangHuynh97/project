import m_router = require('../../lib/durandal/js/plugins/router');
import ko = require('knockout');
import $ = require('jquery');

export = class home {
    itemSong = ko.observableArray();
    itemSongPlaylist = ko.observableArray();
    param = m_router.activeInstruction().params[0];
    dataNameSinger = ko.observable('');
    dataImgSinger = ko.observable('');

    getData = fetch('http://localhost:8080/music/get_Singer', {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id_singer: this.param })
    }).then((response) => {
        return response.json();
    }).then((data) => {
        if (!data.dataNameSinger) {
            window.location.href = '#';
        }

        this.dataNameSinger(data.dataNameSinger);
        this.dataImgSinger(data.dataImgSinger);

        var objItemNew = [];
        data.dataSongbySinger.map(function (value) {
            objItemNew.push({ name: value.name, id_gg: value.id_gg, image: value.image, date_create: value.date_create, id_singer: value.id_singer, text_gr_singer: value.text_gr_singer });
        });
        this.itemSong(objItemNew);

        var objItemPlaylist = [];
        data.dataPlaylist.map(function (value) {
            objItemPlaylist.push({ id: value.id, name: value.name, img: value.img, create_by: value.create_by });
        });
        this.itemSongPlaylist(objItemPlaylist);
    });
}