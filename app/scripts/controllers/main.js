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
	$scope.history = [];
	var validVar = /^[a-zA-Z][a-zA-Z_0-9]*$/;

	function simplify(obj) {
		return obj.reduce(function (simpleObj, pair) {
			if (typeof pair.key === 'string' && pair.key.match(validVar)) {
				if (!isNaN(pair.value)) {
					simpleObj[pair.key] = +pair.value;
				} else if (typeof pair.value === 'object') {
					simpleObj[pair.key] = simplify(pair.value);
				} else {
					simpleObj[pair.key] = pair.value;
				}
			}
			return simpleObj;
		}, {});
	}

	function createMethod (val) {
		var obj = simplify($scope.object),
		keys = Object.keys(obj),
		values = keys.map(function (key) {
			return obj[key];
		});
		if (keys.indexOf('FILE') === -1) {
			keys.push('FILE');
			values.push(simplify($scope.file));
		}

		keys.push('return ' + val.substr(1));
		var func = Function.constructor.apply(Function, keys);
		return function () {

			return func.apply(null, values);
		};
	}

	function createObject (obj) {
		try {
			if (typeof obj === 'string') {
				obj = window.eval('x = ' + obj);
			}
			return Object.keys(obj).map(function (key) {
				var value = obj[key];
				if (typeof value === 'object') {
					value = createObject(value);
				}
				return {
					key: key,
					value: value
				};
			});
		} catch (e) {
			return [{key: '', value: ''}];
		}
	}

    $scope.object = [
    	{key: 'foo', value: '1.1'},
    	{key: 'bar', value: '2.2'},
    	{key: '', value: '=foo + bar'},
    	{key: 'object!', value: [{key: '', value: ''}]}
    ];

    $scope.file = $scope.object;


    $scope.add = function () {
    	$scope.object.push({key: '', value: ''});
    };

    $scope.toString = function (obj) {
    	return obj[0].key + ': ' + obj[0].value;
    };

    $scope.updateValue = function (pair) {
    	if (pair.value[0] === '{') {
    		pair.value = createObject(pair.value);
    	}
    	pair.isObj = false;
    	if (typeof pair.value === 'object') {
    		pair.isObj = true;

    	} else if (pair.value[0] === '=') {
    		pair.method = pair.value;
			try {
				pair.value = createMethod(pair.method)();
				if (typeof pair.value === 'undefined') {
					pair.value = 'undefined';
				}
			} catch (e) {
				pair.value = e;
			}

    	} else {
    		delete pair.method;
    		return;
    	}
		
    };

    $scope.showValue = function (key) {
    	console.log(key);
    	if (key.method) {
    		key.value = key.method;
    	}
    };

    $scope.changeObject = function (obj) {
    	var index = $scope.history.indexOf(obj);
    	if (index === -1) {
    		$scope.history.push($scope.object);
    	} else {
    		$scope.history = $scope.history.slice(0, index);
    	}
    	$scope.object = obj;
    };

});
