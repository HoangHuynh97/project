requirejs.config({
    paths: {
        'text': '../lib/require/text',
        'durandal':'../lib/durandal/js',
        'plugins' : '../lib/durandal/js/plugins',
        'transitions' : '../lib/durandal/js/transitions',
        'knockout': '../lib/knockout/knockout-3.1.0',
        'bootstrap': '../lib/bootstrap/js/bootstrap',
        'jquery': '../lib/jquery/jquery-1.9.1',
        'sweetalert2': '../lib/sweetalert2/dist/sweetalert2.all.min'
    },
    shim: {
        'bootstrap': {
            deps: ['jquery'],
            exports: 'jQuery'
       }
    }
});

define(['durandal/system', 'durandal/app', 'durandal/viewLocator', 'knockout', 'jquery', 'plugins/http', 'sweetalert2'], function (system, app, viewLocator, ko, $, http, sweetalert2) {
    //>>excludeStart("build", true);
    system.debug(true);
    window['app'] = app;
    window['ko'] = ko;
    window['$'] = $;
    window['http'] = http;
    window['sweetalert2'] = sweetalert2;
   //>>excludeEnd("build");

    app.title = 'Max Music';

    app.configurePlugins({
        router:true,
        dialog: true
    });

    app.start().then(function() {
        //Replace 'viewmodels' in the moduleId with 'views' to locate the view.
        //Look for partial views in a 'views' folder in the root.
        viewLocator.useConvention();

        //Show the app by setting the root view model for our application with a transition.
        app.setRoot('viewmodels/shell', 'entrance');
    });
});