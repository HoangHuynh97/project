import ko = require('knockout');
import Swal = require('../../lib/sweetalert2/dist/sweetalert2.all.min');

export = class {

    valueUser = ko.observable('');
    valuePass = ko.observable('');


    checkLogin() {
        if (this.valueUser() == '' || this.valuePass() == '') {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'aaaa'
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'aaaa!'
            });
        }
    }
}