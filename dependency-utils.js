'use strict';

module.exports = {
    installDependency: function (caller, names, callback) {
        var cb = caller.async();
        caller.bowerInstall(names, { save: true }, function () {
            console.log('installed components: ' + names);
            callback.call(caller);
            cb();
        });
    }
};
