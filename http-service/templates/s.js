'use strict';
angular.module('<%= appname %>.service', [])
.factory('<%= name %>Service', ['$http', function ($http<% for (count = 0; count < injections.length; count += 1) { %>, <%= injections[count] %><% } %>) {
    return {
        get: function (callback<% for (count = 0; count < properties.length; count += 1) { %>, <%= properties[count] %><% } %>) {
            $http.<%= type %>('<%= url %>').success(function (data) {
                callback(data);
            });
        }
    };
}]);
