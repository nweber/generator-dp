'use strict';

////////////////////////////////////////////
//
// Yeoman Base
//
////////////////////////////////////////////

var util = require('util'),
    path = require('path'),
    yeoman = require('yeoman-generator');

var DpGenerator = module.exports = function DpGenerator(args, options, config) {
    // Start
    yeoman.generators.Base.apply(this, arguments);

    // Get application name
    this.argument('appname', { type: String, required: false });
    this.appname = this.appname || path.basename(process.cwd());

    // Store scipts
    this.libScripts = [];
    this.mainScripts = [];

    // Get index file
    this.indexFile = this.readFileAsString(path.join(this.sourceRoot(), 'index.html'));
    this.indexFile = this.engine(this.indexFile, this);

    // Finish up
    this.on('end', function () {
        this.installDependencies({ skipInstall: options['skip-install'] });
    });

    this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(DpGenerator, yeoman.generators.Base);

DpGenerator.prototype.getPrompts = function getPrompts() {
    return [
        {
            type: 'checkbox',
            name: 'frameworks',
            message: 'Which frameworks would you like to include?',
            choices: [
                {
                    value: 'jquery',
                    name: 'jquery-framework.js',
                    checked: false
                },
                {
                    value: 'bootstrap',
                    name: 'bootstrap-framework.js',
                    checked: false
                },
                {
                    value: 'foundation',
                    name: 'foundation-framework.js',
                    checked: false
                }
            ]
        }
    ];
}

DpGenerator.prototype.askFor = function askFor() {
    var cb = this.async();

    // have Yeoman greet the user.
    console.log(this.yeoman);

    var prompts = this.getPrompts();

    this.prompt(prompts, function (props) {
        var hasFramework = function (f) { return props.frameworks.indexOf(f) !== -1; };

        this.includeJquery = hasFramework('jquery');
        this.includeBootstrap = hasFramework('bootstrap');
        this.includeFoundation = hasFramework('foundation');

        cb();
    }.bind(this));
};

////////////////////////////////////////////
//
// Frameworks and Such
//
////////////////////////////////////////////

DpGenerator.prototype.general = function general() {
    this.copy('_package.json', 'package.json');
};

DpGenerator.prototype.grunt = function grunt() {
    this.copy('Gruntfile.js');
};

DpGenerator.prototype.git = function git() {
    this.copy('gitignore', '.gitignore');
    this.copy('gitattributes', '.gitattributes');
};

DpGenerator.prototype.bower = function bower() {
    this.copy('bowerrc', '.bowerrc');
    this.copy('_bower.json', 'bower.json');
};

DpGenerator.prototype.jshint = function jshint() {
    this.copy('jshintrc', '.jshintrc');
};

DpGenerator.prototype.editorConfig = function editorConfig() {
    this.copy('editorconfig', '.editorconfig');
};

////////////////////////////////////////////
//
// Yeoman Generator
//
////////////////////////////////////////////

DpGenerator.prototype.app = function app() {
    this.mkdir('app');
    this.mkdir('app/scripts');
    this.mkdir('app/scripts/libs');
    this.mkdir('app/styles');
    this.mkdir('app/images');
};

////////////////////////////////////////////
//
// Signals
//
////////////////////////////////////////////

DpGenerator.prototype.signals = function signals() {
    this.bowerInstall([ 'js-signals' ], { save: true });
    this.libScripts.push('bower_components/js-signals/signals.js');
};

////////////////////////////////////////////
//
// Angular
//
////////////////////////////////////////////

DpGenerator.prototype.angular = function angular() {
    this.bowerInstall([ 'angular' ], { save: true });
    this.libScripts.push('bower_components/angular/angular.js');

    this.copy('app.js', 'app/scripts/app.js');
    this.mainScripts.push('scripts/app.js');

    this.mkdir('app/scripts/controllers');
    this.mkdir('app/scripts/views');
};

////////////////////////////////////////////
//
// SASS
//
////////////////////////////////////////////

DpGenerator.prototype.sass = function sass() {
    var files = ['main.scss'];

    files.forEach(function (file) {
        this.copy(file, 'app/styles/' + file);
    }.bind(this));

    this.indexFile = this.appendFiles({
        html: this.indexFile,
        fileType: 'css',
        optimizedPath: 'styles/main.css',
        sourceFileList: files.map(function (file) {
            return 'styles/' + file.replace('.scss', '.css');
        }),
        searchPath: '.tmp'
    });
};

////////////////////////////////////////////
//
// Clean Up
//
////////////////////////////////////////////

DpGenerator.prototype.writeIndex = function writeIndex() {
    this.indexFile = this.appendScripts(this.indexFile, 'scripts/libs.js', this.libScripts);
    this.indexFile = this.appendScripts(this.indexFile, 'scripts/main.js', this.mainScripts);
    this.write('app/index.html', this.indexFile);
}

////////////////////////////////////////////
//
// Frameworks
//
////////////////////////////////////////////

DpGenerator.prototype.angularDefaults = function angularDefaults() {
    var options = {
        args: [this.appname]
    }

    this.invoke("dp:controller", options, function () {
        console.log("Main application controller created.");
    });
}

DpGenerator.prototype.frameworks = function frameworks() {
    if (this.includeJquery) {
        this.invoke("dp:jquery", {}, function () {
            console.log("JQuery installed.");
        });
    }

    if (this.includeBootstrap) {
        this.invoke("dp:bootstrap", {}, function () {
            console.log("Bootstrap installed.");
        });
    }

    if (this.includeFoundation) {
        this.invoke("dp:foundation", {}, function () {
            console.log("Foundation installed.");
        });
    }
};
