'use strict';
var util = require('util'),
    dependencies = require('../dependency-utils'),
    yeoman = require('yeoman-generator'),
    BaseIndexGenerator = require('../sub-base.js');;

var StateRouterGenerator = module.exports = function StateRouterGenerator(args, options, config) {
    args.push('state-router'); // name it
    BaseIndexGenerator.apply(this, arguments);
    console.log('You called the state-router subgenerator with the argument ' + this.name + '.');
};

util.inherits(StateRouterGenerator, BaseIndexGenerator);

StateRouterGenerator.prototype.doInstall = function doInstall() {
    var cb = dependencies.installDependency(this, ['angular-ui-router'], function () {
        this.mkdir('app/scripts/libs/angular-ui-router');
        dependencies.copyFiles(
            this,
            [
                {
                    src: 'app/bower_components/angular-ui-router/release/angular-ui-router.js',
                    dest: 'app/scripts/libs/angular-ui-router/angular-ui-router.js'
                }
            ],
            function () {
                this.addScriptToIndex(
                    {
                        block: '<!-- build:js scripts/libs.js -->'
                    },
                    [
                        'scripts/libs/angular-ui-router/angular-ui-router.js'
                    ]
                );

                cb();
            }
        );
    });
}

StateRouterGenerator.prototype.askQuestions = function askQuestions() {
    var cb = this.async();

    this.count = 0;
    this.routes = [];

    function askAboutRoute(callback) {
        var prompts = [
            {
                type: 'input',
                name: 'name',
                message: "What is the route's name?"
            },
            {
                type: 'input',
                name: 'url',
                message: "What is the route's url?"
            },
            {
                type: 'input',
                name: 'templateUrl',
                message: "What is the route's templateUrl?"
            },
            {
                type: 'confirm',
                name: 'more',
                message: "Make another route?"
            }
        ];

        this.prompt(prompts, function (props) {
            this.routes.push({
                name: props.name,
                url: props.url,
                templateUrl: props.templateUrl
            });

            if (props.more) {
                askAboutRoute.call(this, callback);
            }
            else {
                callback();
            }
        }.bind(this));
    }

    askAboutRoute.call(this, function () {
        var prompts = [
            {
                type: 'input',
                name: 'defaultUrl',
                message: 'What is the default route url?'
            }
        ];

        this.prompt(prompts, function (props) {
            this.defaultUrl = props.defaultUrl;

            cb();
        }.bind(this));
    }.bind(this));
}

StateRouterGenerator.prototype.doSetup = function doSetup() {
    this.addModuleToApp(
        {
            block: '// module:block'
        },
        [
            'ui.router'
        ]
    );

    var app = 'app/',
        path = 'scripts/',
        file = 'StateRouter.js';

    this.copy('r.js', app + path + file);
    this.addScriptToIndex(
        {
            block: '<!-- build:js scripts/main.js -->'
        },
        [
            path + file
        ]
    );
}
