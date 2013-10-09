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
    var cb = dependencies.installDependency(this, ['jquery'], function () {
        this.mkdir('app/scripts/libs/jquery');
        dependencies.copyFiles(
            this,
            [
                {
                    src: 'app/bower_components/jquery/jquery.js',
                    dest: 'app/scripts/libs/jquery/jquery.js'
                }
            ],
            function () {
                this.addScriptToIndex(
                    {
                        block: '<!-- build:js scripts/libs.js -->',
                        priority: 1
                    },
                    [
                        'scripts/libs/jquery/jquery.js'
                    ]
                );

                cb();
            }
        );
    });
};
