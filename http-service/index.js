'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var BaseIndexGenerator = require('../sub-base.js');

var HttpServiceGenerator = module.exports = function JsonServiceGenerator(args, options, config) {
    BaseIndexGenerator.apply(this, arguments);
    this.argument('url', { type: String, required: true });
    this.argument('type', { type: String, required: false });

    console.log('Creating an http service named: "' + this.name + 'Service"');
    console.log('for url: ' + this.url);

    if (!this.type) {
        this.type = 'get';
    }
    console.log('with type: ' + this.type);

    this.count = 0; // for loops in template
};

util.inherits(HttpServiceGenerator, BaseIndexGenerator);

HttpServiceGenerator.prototype.askForDependencies = function askForDependencies() {
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

        this.injections = (d !== '') ? props.dependencies.split(' ') : [];

        cb();
    }.bind(this));
}

HttpServiceGenerator.prototype.askForProperties = function askForProperties() {
    var cb = this.async();

    var prompts = [
        {
            type: 'input',
            name: 'properties',
            message: 'Which properties would you like to include? (space separated list, blank for none)'
        }
    ];

    this.prompt(prompts, function (props) {
        var p = props.properties.trim();

        this.properties = (p !== '') ? props.properties.split(' ') : [];

        cb();
    }.bind(this));
}

HttpServiceGenerator.prototype.files = function files() {
    var app = 'app/',
        path = 'scripts/services/',
        file = this.name + 'Service.js';

    this.copy('s.js', app + path + file);
    this.addScriptToIndex(
        {
            block: '<!-- build:js scripts/main.js -->'
        },
        [
            path + file
        ]
    );
};
