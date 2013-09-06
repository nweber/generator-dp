'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var BaseIndexGenerator = require('../sub-base.js');

var JsonServiceGenerator = module.exports = function JsonServiceGenerator(args, options, config) {
    BaseIndexGenerator.apply(this, arguments);
    this.argument('url', { type: String, required: true });
    console.log('Creating a json service named: "' + this.name + '" for file (' + this.url + ").");
};

util.inherits(JsonServiceGenerator, BaseIndexGenerator);

JsonServiceGenerator.prototype.files = function files() {
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
