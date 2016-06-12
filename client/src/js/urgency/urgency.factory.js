(function() {
    'use strict';
	angular
		.module('urgency')
		.factory('UrgencyFactory', UrgencyFactory);

	UrgencyFactory.$inject = ['$http', '$q'];

	function UrgencyFactory($http, $q) {		
		var service = {
			searchUrgency: searchUrgency
		};

		return service;

		function _searchUrgency(urgency){
			console.log(urgency);
	    	return $http({
				method: 'GET',
				url: '',
				responseType: "json"			  
			});
		}

		function searchUrgency(urgency){
			var urgency = [];

			var defered = $q.defer();
        	var promise = defered.promise;
        	try {
        		urgency = [
					{
					 	_id: '0001',
					 	name: 'Hospital Regional Loayza',
					 	unit: 3,
					 	type: 'O-',
					 	image: './src/assets/images/bl_2.jpg'
					},
					{
					 	_id: '0002',
					 	name: 'Instituto del Niño',
					 	unit: 4,
					 	type: 'A+',
					 	image: './src/assets/images/bl_2.jpg'

					},
					{
					 	_id: '0003',
					 	name: 'Hospital Regional de la Madre',
					 	unit: 5,
					 	type: 'A-',
					 	image: './src/assets/images/bl_2.jpg'
					}
				];
				
			    defered.resolve(urgency);
			}
			catch(err) {
			    defered.reject(err);
			}
      		
	    	return promise;
		}
	};

})();