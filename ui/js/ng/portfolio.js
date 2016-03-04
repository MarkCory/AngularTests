port = angular.module("portfolio", ['ngRoute', 'ngSanitize', 'pageslide-directive']);

port.config(function($routeProvider){
	$routeProvider
		.when('/',
		{
			templateUrl: "../../../portfolio.html",
			controller: "PortCtrl"
		})
		.when('/project/:number',
		{
			templateUrl: "../../../project.html",
			controller: "ProjCtrl"
		})
		.when('/about',
		{
			templateUrl: "about.html",
			controller: "PortCtrl"
		})
		.otherwise({
			redirectTo:'/'
		})
		// .when('/project/:name/:index',
		// {
		// 	templateUrl: "longdesc.html",
		// 	controller: "PortCtrl"
		// })
});
var routeLoadingIndicator = function($rootScope){
  return {
    restrict:'E',
    template:"<h1 ng-if='isRouteLoading'>Loading...</h1>",
    link:function(scope, elem, attrs){
      scope.isRouteLoading = false;

      $rootScope.$on('$routeChangeStart', function(){
        scope.isRouteLoading = true;
      });

      $rootScope.$on('$routeChangeSuccess', function(){
        scope.isRouteLoading = false;
      });
    }
  };
};
port.controller("PortCtrl", ['$scope', '$http', '$route', function($scope, $http, $routeParams){
	$http.get("ui/js/ng/projects.json")
		.then(function(result){
			$scope.projects = result.data;
			console.log(result.data);
			
		});
	//variables and functions used for the pageslide directive	
	// $scope.pNum = $routeParams;
	$scope.checked = false;
	$scope.current;
	$scope.closed = "close";

	$scope.toggle = function(o, i){
		console.log("index:");
		console.log(i);
		$scope.pNum = i; //when project is clicked, store index
		$scope.swidth = window.innerWidth;
		switch(o){
			case $scope.closed:
				console.log("o is equal, closing panel.");
				$scope.checked = false;
			break;
			case "menu":
				console.log("displaying menu");
				if($scope.checked){
					$scope.side = "left";
					$scope.current = "<p>Insert Menu Here</p>";
				}else{
					$scope.side = "left";
					$scope.checked = !$scope.checked;
					$scope.current = "<p>Insert Menu Here</p>";
				}
			break;
			default:
				console.log("o is not equal, results:\n");
				console.log("o:"+o+"\nscope.closed:"+$scope.closed);
				$scope.current = o;		
				if($scope.checked){
					console.log("panel already open, changing content to current project...")
					if($scope.current == ""){
						$scope.current = "<p>Nothing here yet.</p>"
					}
				}else{
					console.log("toggling panel.")		
					$scope.checked = !$scope.checked;
				}			
			break;
		}
		/*if(o == $scope.closed){ //CHANGE THIS TO A SWITCH STATEMENT, ADD 'MENU' CASE
			console.log("o is equal, closing panel.");
			$scope.checked = false;
		}else{
			console.log("o is not equal, results:\n");
			console.log("o:"+o+"\nscope.closed:"+$scope.closed);
			$scope.current = o;		
			if($scope.checked){
				console.log("panel already open, changing content to current project...")
				if($scope.current == ""){
					$scope.current = "<p>Nothing here yet.</p>"
				}
			}else{
				console.log("toggling panel.")		
				$scope.checked = !$scope.checked;
			}
		}*/
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
		templateUrl: 'longdesc.html',
		link: function(scope, elem, attrs){
			// console.log(elem);
		}	
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
.directive("routeLoadingIndicator", routeLoadingIndicator);
port.filter("sanitize", ['$sce', function($sce){
	return function(htmlCode){
		return $sce.trustAsHtml(htmlCode);
	};
}]);
port.controller("ProjCtrl", ['$scope', '$http', '$route', function($scope, $http, $routeParams){
	$http.get("ui/js/ng/projects.json")
		.then(function(result){
			$scope.projects = result.data;
			console.log(result.data);
			
		});
	$scope.pid = $routeParams.current.params.number;
}]);
