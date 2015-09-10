var app = angular.module('audioApp', ['ngAudio', 'ngMaterial']);

app.directive('audioList', ['ngAudio', function(ngAudio){
	// Runs during compile
	return {
		restrict: 'AE', // E = Element, A = Attribute, C = Class, M = Comment
		link: function($scope, iElm, iAttrs, controller) {
			$scope.audios = [{}];
			$scope.addNewAudio = function() { 
	          $scope.audios.push({}); 
	        };
	        $scope.removeUrl= function(index) {
	          var lastItem = index;
	          $scope.audios.splice(lastItem, 1);
	        };
	       	$scope.addAudios = function(isValid){
	          if(isValid){
	            $scope.objAudios = [];
	          	angular.forEach($scope.audios, function(value, key){
	          		$scope.objAudios.push(ngAudio.load(value.url));
	          	});
	            $scope.indexTrack = 0;
	            $scope.audio = $scope.objAudios[0];
	          } 
	        };
	       	$scope.next = function(index){
				$scope.indexTrack += 1;
				$scope.audio.stop();
				if($scope.indexTrack > ($scope.audios.length - 1) ){
					$scope.indexTrack = 0;
				} 
	        	$scope.audio = $scope.objAudios[$scope.indexTrack];
	        };
	        $scope.prev = function(index){
	          $scope.indexTrack -= 1;
	          $scope.audio.stop();
	          if($scope.indexTrack < 0){
	            $scope.indexTrack = $scope.audios.length - 1;
	          } 
	          $scope.audio = $scope.objAudios[$scope.indexTrack];
	        };
		}
	};
}]);