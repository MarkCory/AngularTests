port = angular.module("portfolio", ['ngSanitize', 'pageslide-directive']);

port.controller("PortCtrl", ['$scope', '$http', function($scope, $http){
	$http.get("ui/js/ng/projects.json")
		.then(function(result){
			$scope.projects = result.data;
			// console.log(result.data);
		});
	//variables and functions used for the pageslide directive	
	$scope.checked = false;
	$scope.current;
	$scope.closed = "close";

	$scope.toggle = function(o){
		// console.log(o);
		$scope.swidth = window.innerWidth;
		if(o == $scope.closed){
			console.log("o is equal, closing panel.");
			$scope.checked = false;
		}else{
			console.log("o is not equal, results:\n");
			console.log("o:"+o+"\nscope.closed:"+$scope.closed);
			$scope.current = o.descB;		
			if($scope.checked){
				console.log("panel already open, changing content to current project...")
				if($scope.current == ""){
					$scope.current = "<p>Nothing here yet.</p>"
				}
			}else{
				console.log("toggling panel.")		
				$scope.checked = !$scope.checked;
			}
		}
	}

	// $('.proj').bind('click', function(){
	// 	$scope.toggle;
	// })
}])
.directive("desc", function(){
	return {
		restrict: 'E',
		template: '<h2>{{project.projectShortName}}</h2>'+
		'<h3 ng-show="{{project.projectLongName}}"><small>{{project.projectLongName}}</small></h3>'+
		'<p ng-bind-html="project.descA"></p>'
	}
})
.directive("longdesc", function(){
	return {
		restrict: 'C',
		template: '<div ng-bind-html="current"></div>'+
		'<a ng-click="toggle('+"'close'"+')">Close!</a>'
	}
})
.directive("resize", function($window){
	return {
		restrict: 'A',
		link: function(scope){
			angular.element($window).on('resize', function(scope){
				console.log(scope);
				scope.swidth = window.innerWidth;
				// scope.toggle("close");
			});
		}
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


