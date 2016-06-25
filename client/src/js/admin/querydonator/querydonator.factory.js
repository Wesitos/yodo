(function() {
    'use strict';
  angular
    .module('querydonator')
    .factory('QueryDonatorFactory', QueryDonatorFactory);

  QueryDonatorFactory.$inject = ['$http', '$q'];

  function QueryDonatorFactory($http, $q) {
    var service = {
      queryDonator: queryDonator
    };

    return service;

    function _queryDonator(query){
        return $http({
        method: 'GET',
        url: '',
        responseType: "json"
      });
    }

    function queryDonator(query){
      var donator = [];

      var defered = $q.defer();
          var promise = defered.promise;
          try {
            donator = {
              firstname: 'Salvador',
              lastname: 'Coronel Flores',
              email: 'salvador2489@gmail.com',
              dni: 46200966
            };

          defered.resolve(donator);
      }
      catch(err) {
          defered.reject(err);
      }

        return promise;
    }
  };

})();
