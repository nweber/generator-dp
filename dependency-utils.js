'use strict';

var ncp = require('ncp').ncp;

module.exports = {
    installDependency: function (caller, names, callback) {
        var cb = caller.async();
        caller.bowerInstall(names, { save: true }, function () {
            console.log('installed components: ' + names);
            callback.call(caller);
        });
        return cb;
    },

    copyFiles: function (caller, files, callback) {
        var q = files;

        function loadNextFile () {
            if (q.length > 0) {
                var f = q.pop();
                ncp(f.src, f.dest, function (err) {
                    loadNextFile();
                });
            }
            else {
                callback.call(caller);
            }
        }

        loadNextFile();
    }
};
