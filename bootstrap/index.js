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
    dependencies.installDependency(this, ['bootstrap'], function () {
        this.addCssToIndex(
            {
                block: '<!-- build:css(.tmp) styles/main.css -->'
            },
            [
                'libs/bootstrap/dist/css/bootstrap.css'
            ]
        );

        this.addScriptToIndex(
            {
                block: '<!-- build:js scripts/libs.js -->'
            },
            [
                'libs/bootstrap/dist/js/bootstrap.js'
            ]
        );
    });
};
