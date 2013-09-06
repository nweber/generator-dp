'use strict';
angular.module('<%= appname %>')
.controller('<%= name %>Controller',
<% if (has_injections) { %>function ($scope, <%= injections_list %>) {<% } else { %>function ($scope) {<% } %>
    $scope.demo = 'The quick brown fox jumps over the lazy dog.';
});
