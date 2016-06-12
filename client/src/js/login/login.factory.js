(function() {
    'use strict';
	angular
		.module('login')
		.factory('LoginFactory', LoginFactory);

	LoginFactory.$inject = ['$http', '$q'];

	function LoginFactory($http, $q) {		
		var service = {
			login: login,
			_login: _login
		};

		return service;

		function _login(login){
			console.log(login);
	    	return $http({
				method: 'GET',
				url: '/api/login',
				responseType: "json"			  
			});
		}

		function login(login){
			var login = {};

			var defered = $q.defer();
        	var promise = defered.promise;
        	try {
        		login = {token: 'token123'};
				
			    defered.resolve(login);
			}
			catch(err) {
			    defered.reject(err);
			}
      		
	    	return promise;
		}
	};

})();