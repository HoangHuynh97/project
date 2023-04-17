import m_router = require('../../lib/durandal/js/plugins/router');

export = class {
    router = m_router;
    activate() {
        m_router.map([
            { route: '', title: 'Home', moduleId: 'viewmodels/home', nav: true },
            { route: 'login', moduleId: 'viewmodels/login', nav: true },
            { route: 'profile', moduleId: 'viewmodels/profile', nav: true },
            { route: 'new', moduleId: 'viewmodels/new', nav: true },
            { route: 'singer/:id', moduleId: 'viewmodels/singer', nav: true },
            { route: 'playlist/:id', moduleId: 'viewmodels/playlist', nav: true }
        ]).buildNavigationModel();
        return m_router.activate();
    };
}