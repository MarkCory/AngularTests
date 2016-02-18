port = angular.module("portfolio", ['ngSanitize', 'pageslide-directive']);

port.controller("PortCtrl", ['$scope', '$http', function($scope, $http){
	$http.get("ui/js/ng/projects.json")
		.then(function(result){
			$scope.projects = result.data;
			console.log(result.data);
		});
	$scope.checked;
	$('.proj').bind('click', function(){

	})
}])
.directive("desc", function(){
	return {
		restrict: 'E',
		template: '<h2>{{project.projectShortName}}</h2>'+
		'<h3 ng-show="{{project.projectLongName}}"><small>{{project.projectLongName}}</small></h3>'+
		'<p ng-bind-html="project.descA"></p>'
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


