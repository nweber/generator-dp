'use strict';

////////////////////////////////////////////
//
// Yeoman Base
//
////////////////////////////////////////////

var util = require('util'),
    path = require('path'),
    dependencies = require('../dependency-utils'),
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
    // console.log(this.yeoman);

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
    var cb = dependencies.installDependency(this, ['js-signals'], function () {
        this.mkdir('app/scripts/libs/js-signals');
        dependencies.copyFiles(
            this,
            [
                {
                    src: 'app/bower_components/js-signals/dist/signals.js',
                    dest: 'app/scripts/libs/js-signals/signals.js'
                }
            ],
            function () {
                this.libScripts.push('scripts/libs/js-signals/signals.js');

                cb();
            }
        );
    });
};

////////////////////////////////////////////
//
// Underscore
//
////////////////////////////////////////////

DpGenerator.prototype.underscore = function underscore() {
    var cb = dependencies.installDependency(this, ['underscore', 'underscore.string'], function () {
        this.mkdir('app/scripts/libs/underscore');
        dependencies.copyFiles(
            this,
            [
                {
                    src: 'app/bower_components/underscore/underscore.js',
                    dest: 'app/scripts/libs/underscore/underscore.js'
                },
                {
                    src: 'app/bower_components/underscore.string/lib/underscore.string.js',
                    dest: 'app/scripts/libs/underscore/underscore.string.js'
                }
            ],
            function () {
                this.libScripts.push('scripts/libs/underscore/underscore.js');
                this.libScripts.push('scripts/libs/underscore/underscore.string.js');

                cb();
            }
        );
    });
};

////////////////////////////////////////////
//
// Signals
//
////////////////////////////////////////////

DpGenerator.prototype.signals = function signals() {
    var cb = dependencies.installDependency(this, ['js-signals'], function () {
        this.mkdir('app/scripts/libs/js-signals');
        dependencies.copyFiles(
            this,
            [
                {
                    src: 'app/bower_components/js-signals/dist/signals.js',
                    dest: 'app/scripts/libs/js-signals/signals.js'
                }
            ],
            function () {
                this.libScripts.push('scripts/libs/js-signals/signals.js');

                cb();
            }
        );
    });
};

////////////////////////////////////////////
//
// Angular
//
////////////////////////////////////////////

DpGenerator.prototype.angular = function angular() {
    var cb = dependencies.installDependency(this, ['angular'], function () {
        this.mkdir('app/scripts/libs/angular');
        dependencies.copyFiles(
            this,
            [
                {
                    src: 'app/bower_components/angular/angular.js',
                    dest: 'app/scripts/libs/angular/angular.js'
                }
            ],
            function () {
                this.libScripts.push('scripts/libs/angular/angular.js');

                this.copy('app.js', 'app/scripts/app.js');
                this.mainScripts.push('scripts/app.js');

                this.mkdir('app/scripts/controllers');
                this.mkdir('app/scripts/services');
                this.mkdir('app/scripts/views');

                cb();
            }
        );
    });
};

DpGenerator.prototype.angularResource = function angularResource() {
    var cb = dependencies.installDependency(this, ['angular-resource'], function () {
        this.mkdir('app/scripts/libs/angular-resource');
        dependencies.copyFiles(
            this,
            [
                {
                    src: 'app/bower_components/angular-resource/angular-resource.js',
                    dest: 'app/scripts/libs/angular-resource/angular-resource.js'
                }
            ],
            function () {
                this.libScripts.push('scripts/libs/angular-resource/angular-resource.js');

                cb();
            }
        );
    });
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

DpGenerator.prototype.appendAllScripts = function appendAllScripts() {
    this.indexFile = this.appendScripts(this.indexFile, 'scripts/libs.js', this.libScripts);
    this.indexFile = this.appendScripts(this.indexFile, 'scripts/main.js', this.mainScripts);
}

DpGenerator.prototype.appendDevEnvironment = function appendDevEnvironment() {
    var lines = this.indexFile.split('\n'),
        start = '<!-- build:',
        end = '<!-- endbuild -->';

    function appendLine(lines, index, before, str) {
        var spaces = 0;
        while (lines[index].charAt(spaces) === ' ') {
            spaces += 1;
        }

        var spaceStr = '';
        while ((spaces -= 1) >= 0) {
            spaceStr += ' ';
        }

        var insertIndex = index;
        if (!before) {
            insertIndex = index + 1;
        }

        lines.splice(insertIndex, 0, (spaceStr + str));
    }

    var i,
        line;

    for (i = 0; i < lines.length; i++) {
        line = lines[i];

        if (line.indexOf(start) !== -1) {
            appendLine(lines, i, true, "<!-- @if NODE_ENV='development' -->");
            i++; // skip the added line
        }
        if (line.indexOf(end) !== -1) {
            appendLine(lines, i, false, "<!-- @endif -->");
            i++; // skip the added line
        }
    };

    this.indexFile = lines.join('\n');
}

DpGenerator.prototype.writeIndex = function writeIndex() {
    this.write('app/index.html', this.indexFile);
}

////////////////////////////////////////////
//
// Frameworks
//
////////////////////////////////////////////

DpGenerator.prototype.angularDefaults = function angularDefaults() {
    var cb = this.async();

    var options = {
        args: [this.appname]
    }

    //console.log("Creating main controller...");
    this.invoke("dp:controller", options, function () {
        console.log("Main application controller created.");

        cb();
    });
}

DpGenerator.prototype.frameworks = function frameworks() {
    var cb = this.async(),
        loading = 0,
        loaded = 0;

    if (this.includeJquery) {
        loading += 1;
        this.invoke("dp:jquery", {}, function () {
            console.log("JQuery installed.");
            loaded += 1;
            checkDone();
        });
    }

    if (this.includeBootstrap) {
        loading += 1;
        this.invoke("dp:bootstrap", {}, function () {
            console.log("Bootstrap installed.");
            loaded += 1;
            checkDone();
        });
    }

    if (this.includeFoundation) {
        loading += 1;
        this.invoke("dp:foundation", {}, function () {
            console.log("Foundation installed.");
            loaded += 1;
            checkDone();
        });
    }

    function checkDone() {
        if (loading === loaded) {
            cb();
        }
    }

    checkDone();
};
