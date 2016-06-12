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
				method: 'POST',
				url: 'http://10.100.100.153:9000/api/receptor',
				data: {
					data: {
					  bloodType: urgency.tipo,
					  quantity: urgency.quantity,
					  bloodBank: "adbhjhfye3743ji3gd",
					  deadLine: "2016-06-12",
					  dni: urgency.dni
					}
				},
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
					 	quantity: 3,
					 	type: 'O-',
					 	dni: "46200966",
					 	priority: new Date()
					},
					{
					 	_id: '0002',
					 	quantity: 4,
					 	type: 'A+',
					 	dni: "72888191",
					 	priority: (new Date ).setDate( (new Date()).getDate() + 6 )
					},
					{
					 	_id: '0003',
					 	quantity: 5,
					 	type: 'A-',
					 	dni: "07543329",
					 	priority: (new Date ).setDate( (new Date()).getDate() + 12 )
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