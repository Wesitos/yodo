(function() {
    'use strict';
  angular
    .module('donator')
    .controller('DonatorCtrl', DonatorCtrl);

  DonatorCtrl.$inject = ['DonatorFactory', '$state'];

  function DonatorCtrl(DonatorFactory, $state) {
    var input = document.getElementById('searchTextField');
    var vm = this;
    vm.donator = {
      firstname: 'Salvador',
      lastname: 'Coronel Flores',
      telephone: 940371198,
      email: 'Salvador2489@gmail.com',
      type: 'O-',
      location: 'lima',
      gender: 'M'
    };
    vm.createDonator = createDonator;

    init();

    function init(){

          var searchBox = new google.maps.places.SearchBox(input);

          searchBox.addListener('places_changed', function() {
          var places = searchBox.getPlaces();

          vm.donator.ubication = {
            formatted_address: places[0].formatted_address,
            lat: places[0].geometry.location.lat(),
            lng: places[0].geometry.location.lng()
          };

          if (places.length == 0) {
            return;
          }
      });

    };

    function createDonator(form){
      if( form.$valid ){
        DonatorFactory.createDonator(vm.donator).then(function(response) {
                console.log(response);
                $state.go('urgency');
            });
          }else{
            console.log('form no validate');
          }
    }
  };
})();
