﻿import ko = require('knockout');
import $ = require('jquery');

export = class home {
    itemSong = ko.observableArray();
    itemSongLike = ko.observableArray();
    itemSongLikePlaylist = ko.observableArray();
    isTab = ko.observable(1);

    changeViewTab(data, key) {
        if (data == 1) {
            this.isTab(1);
        } else if (data == 2) {
            this.isTab(2);
        } else if (data == 3) {
            this.isTab(3);
        }
    }

    getData = fetch('http://localhost:8080/music/get_DataProfile', {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id_user: sessionStorage.getItem("id_user") })
    }).then((response) => {
        return response.json();
    }).then((data) => {
        var objItemNew = [];
        data.dataPlaylist.map(function (value) {
            objItemNew.push({ name: value.name, id: value.id, img: value.img, create_by: value.create_by });
        });
        this.itemSong(objItemNew);

        var objItemLike = [];
        data.dataSongLike.map(function (value) {
            objItemLike.push({ id: value.id, name: value.name, id_gg: value.id_gg, image: '../../assets/images' + value.image, date_create: value.date_create, id_singer: value.id_singer, text_gr_singer: value.text_gr_singer });
        });
        this.itemSongLike(objItemLike);

        var objItemLikePlaylist = [];
        data.dataPlaylistLike.map(function (value) {
            objItemLikePlaylist.push({ name: value.name, is_like: value.is_like, id: value.id, img: value.img, create_by: value.create_by });
        });
        this.itemSongLikePlaylist(objItemLikePlaylist);
        
    });
}