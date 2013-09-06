'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var BaseIndexGenerator = require('../sub-base.js');

var ControllerGenerator = module.exports = function ControllerGenerator(args, options, config) {
    BaseIndexGenerator.apply(this, arguments);
    this.argument('injections', { type: Array, required: false });
    console.log('Creating a controller named: ' + this.name + 'Controller.');
};

util.inherits(ControllerGenerator, BaseIndexGenerator);

ControllerGenerator.prototype.init = function init() {
    if (this.injections && this.injections.length > 0) {
        this.has_injections = true;
        this.injections_list = this.injections.join(", ");
        console.log('Initalizing controller with: ' + this.injections_list);
    }
    else {
        this.has_injections = false;
    }
}

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
