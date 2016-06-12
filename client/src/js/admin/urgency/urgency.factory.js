(function() {
    'use strict';
	angular
		.module('urgencyadmin')
		.factory('UrgencyAdminFactory', UrgencyAdminFactory);

	UrgencyAdminFactory.$inject = ['$http', '$q'];

	function UrgencyAdminFactory($http, $q) {		
		var service = {
			createUrgency: createUrgency,
			listUrgencies: listUrgencies
		};

		return service;

		function createUrgency(urgency){			
	    	return $http({
				method: 'GET',
				url: '',
				responseType: "json"		  
			});
		}

		function listUrgencies(){
			var urgencies = [];

			var defered = $q.defer();
        	var promise = defered.promise;
        	try {
        		urgencies = [
					{
					 	_id: '0001',
					 	unit: 3,
					 	type: 'O-',
					 	dni: 46200966,
					 	priority: new Date()
					},
					{
					 	_id: '0002',
					 	unit: 4,
					 	type: 'A+',
					 	dni: 46200966,
					 	priority: new Date()
					},
					{
					 	_id: '0003',
					 	unit: 5,
					 	type: 'A-',
					 	dni: 46200966,
					 	priority: new Date()
					}
				];
				
			    defered.resolve(urgencies);
			}
			catch(err) {
			    defered.reject(err);
			}
      		
	    	return promise;
		}
	};

})();