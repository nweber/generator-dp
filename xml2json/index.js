'use strict';
var util = require('util'),
    yeoman = require('yeoman-generator'),
    dependencies = require('../dependency-utils'),
    BaseIndexGenerator = require('../sub-base.js');

var Xml2jsonGenerator = module.exports = function Xml2jsonGenerator(args, options, config) {
	args.push('xml2json'); // name it
    BaseIndexGenerator.apply(this, arguments);
    console.log('xml2json subgenerator invoked.');
};

util.inherits(Xml2jsonGenerator, BaseIndexGenerator);

Xml2jsonGenerator.prototype.files = function files() {
  this.copy('xml2json.js', 'app/libs/xml2json/xml2json.js');

  this.addScriptToIndex(
        {
            block: '<!-- build:js scripts/libs.js -->',
            priority: 1
        },
        [
            'libs/xml2json/xml2json.js'
        ]
    );
};
