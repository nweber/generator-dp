'use strict';
angular.module('<%= appname %>.service', ['ngResource'])
.factory('<%= name %>', function ($resource) {
    return $resource('<%= url %>', {}, {
        query: {method: 'GET', isArray: false}
    });
});
