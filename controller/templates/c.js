'use strict';
angular.module('<%= appname %>')
.controller('<%= name %>Controller',
function ($scope<% for (count = 0; count < injections.length; count += 1) { %>, <%= injections[count] %><% } %>) {
    $scope.demo = 'The quick brown fox jumps over the lazy dog.';
});
