angTestApp = angular.module("angTestApp", []);

angTestApp.controller('testController', function($scope){
	$scope.vars = [
		{'name':'first', 'value':1},
		{'name':'second', 'value':2},
		{'name':'third', 'value':3}
	];
});