'use strict';
angular.module('<%= appname %>.service')
.factory('<%= name %>', function ($http) {
    return {
    	query: function (callback) {
    		return $http.get('<%= url %>').then(function (result) {
    			var x2js = new X2JS();
    			var json = x2js.xml2json(result);
    			callback(json);
    		});
    	}
    }
});
