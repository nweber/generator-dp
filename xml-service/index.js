'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var BaseIndexGenerator = require('../sub-base.js');

var XmlServiceGenerator = module.exports = function XmlServiceGenerator(args, options, config) {
    BaseIndexGenerator.apply(this, arguments);
    this.argument('url', { type: String, required: true });
    console.log('**NOTE** Requires xml2json | install with $yo dp:xml2json');
    console.log('Creating a xml service named: "' + this.name + '" for file (' + this.url + ").");
};

util.inherits(XmlServiceGenerator, BaseIndexGenerator);

XmlServiceGenerator.prototype.files = function files() {
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
