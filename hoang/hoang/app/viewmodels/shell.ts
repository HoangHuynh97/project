import m_router = require('../../lib/durandal/js/plugins/router');
import m_system = require('../../lib/durandal/js/system');
import ko = require('knockout');

export = class {
    router = m_router;
    activate = function () {
        m_router.map([
            { route: '', title: 'Home', moduleId: 'viewmodels/home', nav: true },
            { route: 'flickr', moduleId: 'viewmodels/flickr', nav: true },
            { route: 'test', moduleId: 'viewmodels/test', nav: true }
        ]).buildNavigationModel();

        return m_router.activate();
    };

    setIsSelected = ko.observable(false);
}