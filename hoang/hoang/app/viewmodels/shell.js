define(["require", "exports", "../../lib/durandal/js/plugins/router", "knockout"], function (require, exports, m_router, ko) {
    "use strict";
    return /** @class */ (function () {
        function class_1() {
            this.router = m_router;
            this.activate = function () {
                m_router.map([
                    { route: '', title: 'Home', moduleId: 'viewmodels/home', nav: true },
                    { route: 'flickr', moduleId: 'viewmodels/flickr', nav: true },
                    { route: 'test', moduleId: 'viewmodels/test', nav: true }
                ]).buildNavigationModel();
                return m_router.activate();
            };
            this.setIsSelected = ko.observable(false);
        }
        return class_1;
    }());
});
//# sourceMappingURL=shell.js.map