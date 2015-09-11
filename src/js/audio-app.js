var app = angular.module('audioApp', ['ngAudio', 'ngMaterial']);

app.directive('audioList', ['ngAudio', function(ngAudio){
// Runs during compile
	return {
		restrict: 'AE', // E = Element, A = Attribute, C = Class, M = Comment
		link: function($scope, iElm, iAttrs, controller) {
			//Start an empty array named audios in the scope, 
			//so  have an start input to request and app can push new urls as the user interact with the form.
			$scope.audios = [{}]; 
			//ng-click handler for adding new emtpy inputs to the form in order to create a list of audios.
			$scope.addNewAudio = function() { 
				$scope.audios.push({}); 
			};
			//ng-click handler for remove inputs in the form and can work with less audios
			$scope.removeUrl= function(index) {
			var lastItem = index;
				$scope.audios.splice(lastItem, 1);
			};
			//Angular funcition to be trigered on submit, it receives a boolean value in order to execute. 
			$scope.addAudios = function(isValid){
				//As the $submitted handler of FormController can be changed, start a second validation to create our list 
				if(isValid){
					//Defining a new array in which the app is going to store our audio objects, to retrieve playlist functionallity
					$scope.objAudios = [];
					//iterating through the entered urls to create audio objects which  are going to play.
					angular.forEach($scope.audios, function(value, key){
						$scope.objAudios.push(ngAudio.load(value.url));
					});
					//I start a tracker in 0 in order to know in which track of the playlist the program is 
					$scope.indexTrack = 0;
					//Loading the first audio object to the scope, to start playing.
					$scope.audio = $scope.objAudios[0];
				} 
			};

			/*CREATION OF HANDLER FUNCTIONS FOR NEXT AND PREVIOUS SONGS*/
			$scope.playlist = function(functionallity){
				var functionallity = functionallity || '';
				$scope.audio.stop(); //Stopped reproduction before loading new object
				if(functionallity === 'next'){
					$scope.indexTrack += 1; //Increment our songs tracker
					//Validation of tracks, if the next number in the list does not exists return to the first one
					if($scope.indexTrack > ($scope.audios.length - 1) ){ 
						$scope.indexTrack = 0;
					}
				}
				else if(functionallity === 'prev') {
					$scope.indexTrack -= 1;//Decrement our songs tracker
					//Validation of tracks, if the next number is negative, go to the last track in our playlist
					if($scope.indexTrack < 0){
						$scope.indexTrack = $scope.audios.length - 1;
					}
				}
				//After index and function validation load the selected track
				$scope.audio = $scope.objAudios[$scope.indexTrack];
			};
		}
	};
}]);