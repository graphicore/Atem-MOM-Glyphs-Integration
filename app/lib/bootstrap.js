define([
    'bower_components/Atem-RequireJS-Config/browserConfig'
], function(
    configure
) {
    "use strict";
    var setup = {
        baseUrl: 'lib'
      , bowerPrefix: 'bower_components'
      , paths: {
            'Atem-MOM-Glyphs-Integration': './'
        }
    }
    configure(setup, require);
    return require;
});
