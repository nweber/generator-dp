'use strict';
angular.module('<%= appname %>.service', ['ngResource'])
.factory('<%= name %>Service', function ($resource) {
    return $resource('<%= url %>', {}, {
        query: {method: 'GET', isArray: false}
    });
});
