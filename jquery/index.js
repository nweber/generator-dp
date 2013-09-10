'use strict';
var util = require('util'),
    yeoman = require('yeoman-generator'),
    dependencies = require('../dependency-utils'),
    BaseIndexGenerator = require('../sub-base.js');

var JqueryGenerator = module.exports = function JqueryGenerator(args, options, config) {
    args.push('jquery'); // name it
    BaseIndexGenerator.apply(this, arguments);
    console.log('JQuery subgenerator invoked.');
};

util.inherits(JqueryGenerator, BaseIndexGenerator);

JqueryGenerator.prototype.files = function files() {
    dependencies.installDependency(this, ['jquery'], function () {
        this.addScriptToIndex(
            {
                block: '<!-- build:js scripts/libs.js -->',
                priority: 1
            },
            [
                'libs/jquery/jquery.js'
            ]
        );
    });
};
