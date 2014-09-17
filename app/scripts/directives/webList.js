'use strict';
angular.module('webformApp')
.directive('webList', function() {

    return {
        restrict: 'E',
        replace: true,
        scope: {
            value: '='
        },
        link: function () {

        },
        templateUrl: 'views/directives/webist.html'
    };

});