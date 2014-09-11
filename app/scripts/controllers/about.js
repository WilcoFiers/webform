'use strict';

/**
 * @ngdoc function
 * @name webformApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the webformApp
 */
angular.module('webformApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
