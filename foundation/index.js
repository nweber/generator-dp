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
    var cb = dependencies.installDependency(this, ['foundation'], function () {
        this.mkdir('app/scripts/libs/foundation');
        this.mkdir('app/scripts/libs/foundation/vendor');
        dependencies.copyFiles(
            this,
            [
                {
                    src: 'app/bower_components/foundation/scss/foundation.scss',
                    dest: 'app/styles/foundation.scss'
                },
                {
                    src: 'app/bower_components/foundation/scss/normalize.scss',
                    dest: 'app/styles/normalize.scss'
                },
                {
                    src: 'app/bower_components/foundation/scss/foundation',
                    dest: 'app/styles/foundation'
                },
                {
                    src: 'app/bower_components/foundation/js/foundation/',
                    dest: 'app/scripts/libs/foundation/'
                },
                {
                    src: 'app/bower_components/foundation/js/vendor/jquery.js',
                    dest: 'app/scripts/libs/foundation/vendor/jquery.js'
                },
                {
                    src: 'app/bower_components/foundation/js/vendor/custom.modernizr.js',
                    dest: 'app/scripts/libs/foundation/vendor/custom.modernizr.js'
                },
                {
                    src: 'app/bower_components/foundation/js/vendor/zepto.js',
                    dest: 'app/scripts/libs/foundation/vendor/zepto.js'
                }
            ],
            function () {
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
                        'scripts/libs/foundation/vendor/jquery.js',
                        'scripts/libs/foundation/vendor/custom.modernizr.js',
                        'scripts/libs/foundation/vendor/zepto.js',
                        'scripts/libs/foundation/foundation.js',
                        'scripts/libs/foundation/foundation.alerts.js',
                        'scripts/libs/foundation/foundation.clearing.js',
                        'scripts/libs/foundation/foundation.cookie.js',
                        'scripts/libs/foundation/foundation.dropdown.js',
                        'scripts/libs/foundation/foundation.forms.js',
                        'scripts/libs/foundation/foundation.joyride.js',
                        'scripts/libs/foundation/foundation.magellan.js',
                        'scripts/libs/foundation/foundation.orbit.js',
                        'scripts/libs/foundation/foundation.reveal.js',
                        'scripts/libs/foundation/foundation.section.js',
                        'scripts/libs/foundation/foundation.tooltips.js',
                        'scripts/libs/foundation/foundation.topbar.js',
                        'scripts/libs/foundation/foundation.interchange.js',
                        'scripts/libs/foundation/foundation.placeholder.js',
                        'scripts/libs/foundation/foundation.abide.js'
                    ]
                );

                cb();
            }
        );
    });
};
