'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var ncp = require('ncp').ncp;
var BaseIndexGenerator = require('../sub-base.js');

var FoundationGenerator = module.exports = function BootstrapGenerator(args, options, config) {
    args.push('foundation'); // name it
    BaseIndexGenerator.apply(this, arguments);
    console.log('Foundation subgenerator invoked.');
};

util.inherits(FoundationGenerator, BaseIndexGenerator);

FoundationGenerator.prototype.files = function files() {
    var cb = this.async();

    this.addCssToIndex(
        {
            block: '<!-- build:css(.tmp) styles/main.css -->'
        },
        [
            'styles/normalize.css',
            'styles/foundation.css'
        ]
    );

    this.addScriptToIndex(
        {
            block: '<!-- build:js scripts/libs.js -->'
        },
        [
            'bower_components/foundation/js/vendor/jquery.js',
            'bower_components/foundation/js/vendor/custom.modernizr.js',
            'bower_components/foundation/js/vendor/zepto.js',
            'bower_components/foundation/js/foundation/foundation.js',
            'bower_components/foundation/js/foundation/foundation.alerts.js',
            'bower_components/foundation/js/foundation/foundation.clearing.js',
            'bower_components/foundation/js/foundation/foundation.cookie.js',
            'bower_components/foundation/js/foundation/foundation.dropdown.js',
            'bower_components/foundation/js/foundation/foundation.forms.js',
            'bower_components/foundation/js/foundation/foundation.joyride.js',
            'bower_components/foundation/js/foundation/foundation.magellan.js',
            'bower_components/foundation/js/foundation/foundation.orbit.js',
            'bower_components/foundation/js/foundation/foundation.reveal.js',
            'bower_components/foundation/js/foundation/foundation.section.js',
            'bower_components/foundation/js/foundation/foundation.tooltips.js',
            'bower_components/foundation/js/foundation/foundation.topbar.js',
            'bower_components/foundation/js/foundation/foundation.interchange.js',
            'bower_components/foundation/js/foundation/foundation.placeholder.js',
            'bower_components/foundation/js/foundation/foundation.abide.js'
        ]
    );

    var loaded = 0;
    function complete() {
        if (loaded === 3) {
            console.log("complete");
            cb();
        }
    }

    // SASS is sort of goofy and we have to put all of the SCSS files into the same directory for compass to
    // compile them.  Foundation is also dumb 'cause they don't have distribution files in their bower install.
    // Oh well.  In theory we could expand the grunt trask for compass to compile multiple locations with a
    // config file, but I don't wan to do that right now.
    // TODO :
    // Change the gruntfile.js to use a configuration file for compass.
    // Modify that configuration file here and add the /app/bower_components/foundation/scss/ directory.

    this.bowerInstall([ 'foundation' ], { save: true }, function () {
        ncp('app/bower_components/foundation/scss/foundation.scss', 'app/styles/foundation.scss', function (err) {
            loaded += 1;
            complete();
        }.bind(this));

        ncp('app/bower_components/foundation/scss/normalize.scss', 'app/styles/normalize.scss', function (err) {
            loaded += 1;
            complete();
        }.bind(this));

        ncp('app/bower_components/foundation/scss/foundation', 'app/styles/foundation', function (err) {
            loaded += 1;
            complete();
        }.bind(this));
    }.bind(this));
};
