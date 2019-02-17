// Place third party dependencies in the lib folder
//
// Configure loading modules from the lib directory,
// except 'app' ones,
requirejs.config({
    "baseUrl": "js/lib",
    "paths": {
        app             : "../app",
        async           : 'require/async',
        propertyParser  : 'require/propertyParser',
        font            : 'require/font',
        domReady        : 'require/domReady',

        jquery          : 'jquery-1.11.3.min',
        framework7      : 'framework7.min',
        dpanels         : '3d.panels.min',
        isotope         : 'isotope.min',
        imagesLoaded    : 'imagesLoaded.min',
        countdown       : 'countdown.min'
    }
});

// Load the main app module to start the app
requirejs(["app/main"]);