'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var BaseIndexGenerator = require('../sub-base.js');

var BootstrapGenerator = module.exports = function BootstrapGenerator(args, options, config) {
    args.push('bootstrap'); // name it
    BaseIndexGenerator.apply(this, arguments);
    console.log('Bootstrap subgenerator invoked.');
};

util.inherits(BootstrapGenerator, BaseIndexGenerator);

BootstrapGenerator.prototype.files = function files() {
    this.bowerInstall([ 'bootstrap' ], { save: true });

    this.addCssToIndex(
        {
            block: '<!-- build:css(.tmp) styles/main.css -->'
        },
        [
            'bower_components/bootstrap/dist/css/bootstrap.css'
        ]
    );

    this.addScriptToIndex(
        {
            block: '<!-- build:js scripts/libs.js -->'
        },
        [
            'bower_components/bootstrap/dist/js/bootstrap.js'
        ]
    );
};
