'use strict';

angular.module('<%= appname %>')
.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("<%= defaultUrl %>");
    $stateProvider
        <% for (count = 0; count < routes.length; count += 1) { %>.state(
            '<%= routes[count].name %>',
            {
                url: '<%= routes[count].url %>',
                templateUrl: '<%= routes[count].templateUrl %>'
            }
        )<% } %>;
});
