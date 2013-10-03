'use strict';
var util = require('util');
var path = require('path');
var fs = require('fs');
var yeoman = require('yeoman-generator');

// Inspired by https://github.com/yeoman/generator-angular/blob/master/script-base.js
// and https://github.com/yeoman/generator-angular/blob/master/util.js

var BaseIndexGenerator = module.exports = function BaseIndexGenerator(args, options, config) {
    yeoman.generators.NamedBase.apply(this, arguments);
}

util.inherits(BaseIndexGenerator, yeoman.generators.NamedBase);

BaseIndexGenerator.prototype.addModuleToApp = function (options, modules) {
    options.priority = options.priority || 0;

    var items = [];
    modules.forEach(function (s, i) {
        items.push(",'" + s + "'");
    });

    this.rewriteFile({
        file: 'app/scripts/app.js',
        priority: options.priority,
        block: options.block,
        needle: '// endblock',
        splicable: items
    });
}

BaseIndexGenerator.prototype.addScriptToIndex = function (options, scripts) {
    options.priority = options.priority || 0; // assume scripts go at the end

    var items = [];
    scripts.forEach(function (s, i) {
        items.push('<script src="' + s + '"></script>');
    });

    this.rewriteFile({
        file: 'app/index.html',
        priority: options.priority,
        block: options.block,
        needle: '<!-- endbuild -->',
        splicable: items
    });
};

BaseIndexGenerator.prototype.addCssToIndex = function (options, styles) {
    options.priority = options.priority || 1; // assume css goes at the top

    var items = [];
    styles.forEach(function (s, i) {
        items.push('<link rel="stylesheet" href="' + s + '">');
    });

    this.rewriteFile({
        file: 'app/index.html',
        priority: options.priority,
        block: options.block,
        needle: '<!-- endbuild -->',
        splicable: items
    });
};

BaseIndexGenerator.prototype.rewriteFile = function rewriteFile (args) {
    args.path = args.path || process.cwd();
    var fullPath = path.join(args.path, args.file);

    args.haystack = fs.readFileSync(fullPath, 'utf8');
    var body = this.rewrite(args);

    fs.writeFileSync(fullPath, body);
}

BaseIndexGenerator.prototype.rewrite = function rewrite (args) {
    function escapeRegExp (str) {
        return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
    }

    // check if splicable is already in the body text
    var re = new RegExp(args.splicable.map(function (line) {
        return '\s*' + escapeRegExp(line);
    }).join('\n'));

    if (re.test(args.haystack)) {
        return args.haystack;
    }

    var lines = args.haystack.split('\n');

    var otherwiseLineIndex = 0;
    var found = false;
    lines.forEach(function (line, i) {
        if (!found) {
            if (args.priority === 1) {
                if (line.indexOf(args.block) !== -1) {
                    otherwiseLineIndex = i + 1;
                    found = true;
                }
            }
            else {
                if (line.indexOf(args.needle) !== -1) {
                    otherwiseLineIndex = i;

                    var j = i - 1;
                    while (j >= 0) {
                        if (lines[j].indexOf(args.block) !== -1) {
                            found = true;
                            break;
                        }
                        j -= 1;
                    }
                }
            }
        }
    });

    var spaces = 0;
    while (lines[otherwiseLineIndex].charAt(spaces) === ' ') {
        spaces += 1;
    }

    var spaceStr = '';
    while ((spaces -= 1) >= 0) {
        spaceStr += ' ';
    }

    lines.splice(otherwiseLineIndex, 0, args.splicable.map(function (line) {
        return spaceStr + line;
    }).join('\n'));

    return lines.join('\n');
}
