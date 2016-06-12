(function() {
    'use strict';
	angular
		.module('donator')
		.factory('DonatorFactory', DonatorFactory);

	DonatorFactory.$inject = ['$http'];

	function DonatorFactory($http) {		
		var service = {
			createDonator: createDonator
		};

		return service;

		function createDonator(donator){
			console.log(donator);			
	    	return $http({
				method: 'GET',
				url: '',
				responseType: "json"			  
			});
		}
	};

})();