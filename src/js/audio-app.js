(function() {
  var app = angular.module('audioApp', ['ngAudio'])
  .controller('FormCtrl', ['$scope', function ($scope) {
  	$scope.audios = [{}]; 
  	  $scope.addNewAudio = function() { 
    	$scope.audios.push({}); 
    	console.log('test');
  	};
  	$scope.addAudios = function(){
  		console.log($scope);
  		//alert(urls.length);
  	};
  	$scope.removeChoice = function() {
	    var lastItem = $scope.audios.length-1;
	    $scope.audios.splice(lastItem);
  	};
  }]); 

 /* app.directive('audioInput', [ function () {
	
  	return {
  		restrict: 'A',
  		link: function (scope, iElement, iAttrs) {
  			scope.audioUrl = "http://example.com/pathtomp3";
  			console.log(scope);
  		}
  	};
  }]);*/

})();  