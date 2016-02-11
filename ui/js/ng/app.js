//Angular Test App
testApp = angular.module('testApp', []);

testApp.controller('TestCtrl', function($scope){
	//controller logic
	$scope.vars = [{
		name:'Tom',
		description:'This is Thomas',
		number:'1'
	},
	{
		name:'Dick',
		description:'This is Richard',
		number:'2'
	},
	{
		name:'Harry',
		description:'This is Harold',
		number:'3'
	}];
})
.directive('people', function(){
	return {
		restrict: "E",
		template: '<dt>{{person.name}}</dt><dd>{{person.description}}</dd>'
	};
});