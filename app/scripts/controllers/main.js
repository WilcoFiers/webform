'use strict';

/**
 * @ngdoc function
 * @name webformApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the webformApp
 */
angular.module('webformApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
