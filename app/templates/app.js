'use strict';

angular.module('<%= appname %>.service', []);

angular.module('<%= appname %>.directive', []);

angular.module('<%= appname %>.filter', []);

angular.module('<%= appname %>', [
    '<%= appname %>.service',
    '<%= appname %>.directive',
    '<%= appname %>.filter'
]);
