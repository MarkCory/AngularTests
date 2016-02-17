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
})
.directive("masonry", function(){
	return {
		restrict: 'C',
		link: function(scope, elem, attrs){
			// elem.masonry({ itemSelector: '.masonry-brick', columnWidth: 200});
		}
	}
})
.directive("masonry-brick", function(){
	return {
		restrict: 'C',
		link: function(scope, elem, attrs){
			// elem.parents('.masonry').masonry('reload');
		}
	}
});

port.filter("sanitize", ['$sce', function($sce){
	return function(htmlCode){
		return $sce.trustAsHtml(htmlCode);
	};
}]);


