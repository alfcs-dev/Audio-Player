  var app = angular.module('audioApp', ['ngAudio', 'ngMaterial', 'ngMock'])
	.directive('audioPlayer', ['ngAudio',  function(ngAudio){
	    return{
	      restrict: 'AE',
	      link: function(scope, attrs, elem){   
	        scope.audios = [{}];
	        scope.validUrls = [];
	        scope.validAudios = []; 
	        scope.addNewAudio = function() { 
	          scope.audios.push({}); 
	        };
	        scope.removeUrl= function(index) {
	          var lastItem = index;
	          scope.audios.splice(lastItem, 1);
	        };
	        scope.addAudios = function(isValid){
	          if(isValid){
	            scope.validUrls = scope.audios;
	            scope.objAudios = [];
	          	angular.forEach(scope.validUrls, function(value, key){
	          		scope.objAudios.push(ngAudio.load(value.url));
	          	});
	            scope.indexTrack = 0;
	            scope.audio = scope.objAudios[0];
	           	infoFile(scope.audio.id);
	          } 
	        };
	        scope.next = function(index){
	          scope.indexTrack += 1;
	          if(scope.indexTrack > (scope.validUrls.length - 1) ){
	            scope.indexTrack = 0;
	          } 
	         scope.audio = scope.objAudios[scope.indexTrack];

	        };
	        scope.prev = function(index){
	          scope.indexTrack -= 1;
	          if(scope.indexTrack < 0){
	            scope.indexTrack = scope.validUrls.length - 1;
	          } 
	          scope.audio = scope.objAudios[scope.indexTrack];
	        };
	      },
	    };
	}]); 