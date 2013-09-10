'use strict';
var util = require('util'),
    yeoman = require('yeoman-generator'),
    ncp = require('ncp').ncp,
    dependencies = require('../dependency-utils'),
    BaseIndexGenerator = require('../sub-base.js');

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
            'libs/foundation/js/vendor/jquery.js',
            'libs/foundation/js/vendor/custom.modernizr.js',
            'libs/foundation/js/vendor/zepto.js',
            'libs/foundation/js/foundation/foundation.js',
            'libs/foundation/js/foundation/foundation.alerts.js',
            'libs/foundation/js/foundation/foundation.clearing.js',
            'libs/foundation/js/foundation/foundation.cookie.js',
            'libs/foundation/js/foundation/foundation.dropdown.js',
            'libs/foundation/js/foundation/foundation.forms.js',
            'libs/foundation/js/foundation/foundation.joyride.js',
            'libs/foundation/js/foundation/foundation.magellan.js',
            'libs/foundation/js/foundation/foundation.orbit.js',
            'libs/foundation/js/foundation/foundation.reveal.js',
            'libs/foundation/js/foundation/foundation.section.js',
            'libs/foundation/js/foundation/foundation.tooltips.js',
            'libs/foundation/js/foundation/foundation.topbar.js',
            'libs/foundation/js/foundation/foundation.interchange.js',
            'libs/foundation/js/foundation/foundation.placeholder.js',
            'libs/foundation/js/foundation/foundation.abide.js'
        ]
    );

    var loaded = 0;
    function complete() {
        if (loaded === 3) {
            cb();
        }
    }

    // SASS is sort of goofy and we have to put all of the SCSS files into the same directory for compass to
    // compile them.  Foundation is also dumb 'cause they don't have distribution files in their bower install.
    // Oh well.  In theory we could expand the grunt trask for compass to compile multiple locations with a
    // config file, but I don't wan to do that right now.
    // TODO :
    // Change the gruntfile.js to use a configuration file for compass.
    // Modify that configuration file here and add the /app/libs/foundation/scss/ directory.

    dependencies.installDependency(this, ['foundation'], function () {
        ncp('app/libs/foundation/scss/foundation.scss', 'app/styles/foundation.scss', function (err) {
            loaded += 1;
            complete();
        }.bind(this));

        ncp('app/libs/foundation/scss/normalize.scss', 'app/styles/normalize.scss', function (err) {
            loaded += 1;
            complete();
        }.bind(this));

        ncp('app/libs/foundation/scss/foundation', 'app/styles/foundation', function (err) {
            loaded += 1;
            complete();
        }.bind(this));
    }.bind(this));
};
