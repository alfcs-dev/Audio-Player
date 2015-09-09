(function() {
  var app = angular.module('audioApp', ['ngAudio', 'ngMaterial'])
  .directive('audioPlayer', ['ngAudio', function(ngAudio){
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
            scope.indexTrack = 0;
            scope.audio = ngAudio.load(scope.validUrls[0].url);
          }
        };
        scope.next = function(audio, index){
          scope.indexTrack += 1;
          if(scope.indexTrack > (scope.validUrls.length - 1) ){
            scope.indexTrack = 0;
          } 
          scope.audio = ngAudio.load(scope.validUrls[scope.indexTrack].url);
        };
        scope.prev = function(audio, index){
          scope.index_track -= 1;
          scope.audio.stop();
          if(scope.indexTrack < 0){
            scope.indexTrack = scope.validUrls.length - 1;
          } 
          scope.audio = ngAudio.load(scope.validUrls[scope.indexTrack].url);
        };
      },
    };

  }]); 
})();  