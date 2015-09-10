describe('Set of unit tests for audio-app', function() {
	var element, scope;

	beforeEach(function(){
		module('ngMock');
		module('ngAudio');
		module('ngAnimate');
		module('ngAria');
		module('ngMaterial');
		module('audioApp');
	});
	var $httpBackend;

	beforeEach(inject(function($rootScope, $compile) {
		scope = $rootScope.$new();
		element = angular.element('<div audio-list><button ng-click="addNewAudio()"></button></div>');
		element = $compile(element)(scope);
		scope.$digest();
	}));
	beforeEach(inject(function($injector) {
	  $httpBackend = $injector.get('$httpBackend');
	  $httpBackend.whenGET('audiosList.html').respond(200, '');
	}));
	it('Should have an object defined and contain an empty array to start', function(){
		var test = scope.audios;
		expect(scope.audios).toBeDefined();
		expect(test.length).toBe(1);
	});

	it('Should add an empty object when button is clicked', function(){
		for(var i = 1; i<=10; i++){
			element.children('button').triggerHandler('click');
		}
		expect(scope.audios.length).toEqual(11);
	});

	describe('Tests for inputs of form', function(){
		var newscope; 
		beforeEach(inject(function($rootScope, $compile) {
		    newscope = $rootScope.$new();
		    newscope.path = {};
		    newscope.path.url = "head";
		    form = angular.element('<div audio-list><form name="urls" ng-submit="addAudios(urls.$valid)" novalidate ><input name="testinput" type="url" ng-model="path.url" name="" required></form></div>');
		    form = $compile(form)(newscope);
		    newscope.$digest();
	  	}));
		it('Tests validation of inputs to add', function(){
			expect(newscope.urls.testinput.$valid).toBeFalsy();
			newscope.path.url   = "http://alfcastaneda.com";
			newscope.$digest();
			expect(newscope.urls.testinput.$valid).toBeTruthy();	
		});
		it('Tests submit form actions', function(){
			newscope.path.url   = "https://storage.jamendo.com/?trackid=1242848&format=mp31";
		    newscope.audios = [{url: 'https://storage.jamendo.com/?trackid=1242848&format=mp31'}];
			newscope.$digest();
			if(newscope.urls.testinput.$valid){
				newscope.addAudios(true);
				newscope.$digest();
				expect(typeof(newscope.audio)).toBe('object');
			}
		});
	});
});