'use strict';

/**
 * @ngdoc function
 * @name webformApp.controller:DocumentCtrl
 * @description
 * # DocumentCtrl
 * Controller of the webformApp
 */
angular.module('webformApp')
.controller('DocumentCtrl', function ($scope) {
    $scope.object = {
    	'foo' : 1,
    	'bar' : 2,
    	'baz' : {
    		'jazz': 3,
    		'rock': 4
    	}
    };

});
