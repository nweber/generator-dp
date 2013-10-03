'use strict';
var util = require('util'),
    yeoman = require('yeoman-generator'),
    BaseIndexGenerator = require('../sub-base.js');

var ControllerGenerator = module.exports = function ControllerGenerator(args, options, config) {
    BaseIndexGenerator.apply(this, arguments);
    this.argument('injections', { type: Array, required: false });
    console.log('Creating a controller named: ' + this.name + 'Controller.');
};

util.inherits(ControllerGenerator, BaseIndexGenerator);

ControllerGenerator.prototype.askForDependencies = function askForDependencies() {
    var cb = this.async();

    var prompts = [
        {
            type: 'input',
            name: 'dependencies',
            message: 'Which dependencies would you like to include? (space separated list, blank for none)'
        }
    ];

    this.prompt(prompts, function (props) {
        var d = props.dependencies.trim();

        this.count = 0;
        this.injections = (d !== '') ? props.dependencies.split(' ') : [];

        cb();
    }.bind(this));
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
