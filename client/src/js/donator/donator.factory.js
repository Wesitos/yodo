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
        return $http({
        method: 'POST',
        url: '/api/donator',
        data: {
          data: {
              info: {
                  names: donator.firstname,
                  lastNames: donator.lastname,
                  gender: donator.gender,
                  ubigeo: "150102"
              },
              contact: {
                  email: {
                    value: donator.email,
                  },
                  telephone: {
                    value: donator.telephone
                  }
              }
          }
        },
        responseType: "json"
      });
    }
  };

})();
