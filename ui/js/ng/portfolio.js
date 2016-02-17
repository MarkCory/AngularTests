port = angular.module("portfolio", ['ngSanitize']);

port.controller("PortCtrl", ['$scope', '$http', function($scope, $http){
	$http.get("ui/js/ng/projects.json")
		.then(function(result){
			$scope.projects = result.data;
			console.log(result.data);
		});
}])
.directive("desc", function(){
	return {
		restrict: 'E',
		template: '<p ng-bind-html="project.descA"></p><p ng-bind-html="project.descB"></p>'
	}
});

port.filter("sanitize", ['$sce', function($sce){
	return function(htmlCode){
		return $sce.trustAsHtml(htmlCode);
	};
}]);


