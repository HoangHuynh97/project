import ko = require('knockout');
import $ = require('jquery');

export = class home {
    isStart = ko.observable(0);
    itemSong = ko.observableArray();
    sttLoadmore = ko.observable(true);

    getData = fetch('http://localhost:8080/music/get_DataNew', {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id_user: 0, isStart: this.isStart(), loadMore: 20 })
    }).then((response) => {
        return response.json();
    }).then((data) => {
        var objItemNew = [];
        data.dataSongNew.map(function (value) {
            objItemNew.push({ id: value.id, is_like: value.is_like, name: value.name, id_gg: value.id_gg, image: '../../assets/images' + value.image, date_create: value.date_create, id_singer: value.id_singer, text_gr_singer: value.text_gr_singer });
        });
        this.itemSong(objItemNew);
        this.isStart(this.isStart()+20);
    });

    async loadMore() {
        await fetch('http://localhost:8080/music/get_DataNew', {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id_user: 0, isStart: this.isStart(), loadMore: 20 })
        }).then((response) => {
            return response.json();
        }).then((data) => {
            var objItemNew = [];
            data.dataSongNew.map(function (value) {
                objItemNew.push({ id: value.id, is_like: value.is_like, name: value.name, id_gg: value.id_gg, image: '../../assets/images' + value.image, date_create: value.date_create, id_singer: value.id_singer, text_gr_singer: value.text_gr_singer });
            });

            this.itemSong(this.itemSong().concat(objItemNew));
            this.isStart(this.isStart() + 20);
            if (this.isStart() == 100) {
                this.sttLoadmore(false);
            }
        });
    };
}