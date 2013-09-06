'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var BaseIndexGenerator = require('../sub-base.js');

var JqueryGenerator = module.exports = function JqueryGenerator(args, options, config) {
    args.push('jquery'); // name it
    BaseIndexGenerator.apply(this, arguments);
    console.log('JQuery subgenerator invoked.');
};

util.inherits(JqueryGenerator, BaseIndexGenerator);

JqueryGenerator.prototype.files = function files() {
    this.bowerInstall([ 'jquery' ], { save: true });
    this.addScriptToIndex(
        {
            block: '<!-- build:js scripts/libs.js -->',
            priority: 1
        },
        [
            'bower_components/jquery/jquery.js'
        ]
    );
};
