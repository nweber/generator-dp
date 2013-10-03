'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var BaseIndexGenerator = require('../sub-base.js');

var ModelServiceGenerator = module.exports = function JsonServiceGenerator(args, options, config) {
    BaseIndexGenerator.apply(this, arguments);
    console.log('Creating a model service named: "' + this.name + 'Model".');
};

util.inherits(ModelServiceGenerator, BaseIndexGenerator);

ModelServiceGenerator.prototype.files = function files() {
    var app = 'app/',
        path = 'scripts/services/',
        file = this.name + 'Model.js';

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
