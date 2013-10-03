'use strict';

console.log("Environment: " + '/* @echo NODE_ENV */' + " | Version: " + '/* @echo VERSION */');

angular.module('<%= appname %>.service', []);

angular.module('<%= appname %>.directive', []);

angular.module('<%= appname %>.filter', []);

angular.module('<%= appname %>', [
    '<%= appname %>.service'
    ,'<%= appname %>.directive'
    ,'<%= appname %>.filter'
    // module:block
    // endblock
]);
