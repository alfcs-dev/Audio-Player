(function() {
  var app = angular.module('audioApp', ['ngAudio']);
  app.directive('audioInput', [ function () {
	
  	return {
  		restrict: 'A',
  		link: function (scope, iElement, iAttrs) {
  			scope.audioUrl = "http://example.com/pathtomp3";
  			console.log(scope);
  		}
  	};
  }]);

})();