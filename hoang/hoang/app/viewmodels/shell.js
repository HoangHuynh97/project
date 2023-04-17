define(["require", "exports", "../../lib/durandal/js/plugins/router"], function (require, exports, m_router) {
    "use strict";
    return /** @class */ (function () {
        function class_1() {
            this.router = m_router;
        }
        class_1.prototype.activate = function () {
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
        ;
        return class_1;
    }());
});
//# sourceMappingURL=shell.js.map