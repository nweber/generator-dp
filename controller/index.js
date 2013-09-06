'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var BaseIndexGenerator = require('../sub-base.js');

var ControllerGenerator = module.exports = function ControllerGenerator(args, options, config) {
    BaseIndexGenerator.apply(this, arguments);
    console.log('Creating a controller named: ' + this.name + 'Controller.');
};

util.inherits(ControllerGenerator, BaseIndexGenerator);

ControllerGenerator.prototype.files = function files() {
    var app = 'app/',
        path = 'scripts/controllers/',
        file = this.name + 'Controller.js';

    this.copy('c.js', app + path + file);
    this.addScriptToIndex(
        {
            block: '<!-- build:js scripts/main.js -->'
        },
        [
            path + file
        ]
    );
};
