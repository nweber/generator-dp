'use strict';
var util = require('util'),
    yeoman = require('yeoman-generator'),
    dependencies = require('../dependency-utils'),
    BaseIndexGenerator = require('../sub-base.js');

var BootstrapGenerator = module.exports = function BootstrapGenerator(args, options, config) {
    args.push('bootstrap'); // name it
    BaseIndexGenerator.apply(this, arguments);
    console.log('Bootstrap subgenerator invoked.');
};

util.inherits(BootstrapGenerator, BaseIndexGenerator);

BootstrapGenerator.prototype.files = function files() {
    var cb = dependencies.installDependency(this, ['bootstrap'], function () {
        this.mkdir('app/scripts/libs/bootstrap');
        dependencies.copyFiles(
            this,
            [
                {
                    src: 'app/bower_components/bootstrap/dist/css/bootstrap.css',
                    dest: 'app/styles/bootstrap.css'
                },
                {
                    src: 'app/bower_components/bootstrap/dist/js/bootstrap.js',
                    dest: 'app/scripts/libs/bootstrap/bootstrap.js'
                }
            ],
            function () {
                this.addCssToIndex(
                    {
                        block: '<!-- build:css(.tmp) styles/main.css -->'
                    },
                    [
                        'styles/bootstrap.css'
                    ]
                );

                this.addScriptToIndex(
                    {
                        block: '<!-- build:js scripts/libs.js -->'
                    },
                    [
                        'scripts/libs/bootstrap/bootstrap.js'
                    ]
                );

                cb();
            }
        );
    });
};
