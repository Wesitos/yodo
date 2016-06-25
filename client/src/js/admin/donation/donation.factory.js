(function() {
    'use strict';
	angular
		.module('donation')
		.factory('DonationFactory', DonationFactory);

	DonationFactory.$inject = ['$http', '$q'];

	function DonationFactory($http, $q) {		
		var service = {
			createDonation: createDonation,
			listDonations: listDonations
		};

		return service;

		function createDonation(donation){			
	    	return $http({
				method: 'POST',
				url: '/api/donation',
				  data: {data: donation},
				responseType: "json"			  
			});
		}

		function listDonations(){
			var donations = [];

			var defered = $q.defer();
        	var promise = defered.promise;
        	try {
        		donations = [
					{
					 	_id: '0001',
					 	quantity: 3,
					 	dni_paciente: 12200966,
					 	dni_donante: 46200966,
					 	date: new Date()
					},
					{
					 	_id: '0002',
					 	quantity: 4,
					 	dni_paciente: 'A+',
					 	dni_donante: 33200966,
					 	date: new Date()
					},
					{
					 	_id: '0003',
					 	quantity: 5,
					 	dni_paciente: 'A-',
					 	dni_donante: 44200966,
					 	date: new Date()
					}
				];
				
			    defered.resolve(donations);
			}
			catch(err) {
			    defered.reject(err);
			}
      		
	    	return promise;
		}
	};

})();
