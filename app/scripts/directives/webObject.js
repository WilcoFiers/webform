'use strict';
angular.module('webformApp')
.directive('webObject', function() {

    return {
        restrict: 'E',
        replace: true,
        controller: function ($scope) {
            $scope.openField = function () {

            };
        },
        scope: {
            hashMap: '=value'
        },
        link: function () {

        },
        templateUrl: 'views/directives/webObject.html'
    };

});