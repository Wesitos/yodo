(function() {
    'use strict';
  angular
    .module('urgency')
    .controller('UrgencyCtrl', UrgencyCtrl);

  UrgencyCtrl.$inject = ['UrgencyFactory', '$state'];

  function UrgencyCtrl(UrgencyFactory, $state) {
    var input = document.getElementById('searchTextField');
    var vm = this;
    vm.search = {
      type: '',
      location: 'lima'
    };

    vm.searchUrgency = searchUrgency;
    vm.listUrgencies = [];

    init();

    var map;

    function init(){

      if(input){
            var searchBox = new google.maps.places.SearchBox(input);

            searchBox.addListener('places_changed', function() {
            var places = searchBox.getPlaces();

            vm.search.ubication = {
              formatted_address: places[0].formatted_address,
              lat: places[0].geometry.location.lat(),
              lng: places[0].geometry.location.lng()
            };

            if (places.length == 0) {
              return;
            }
            searchUrgency();
        });
      }

      if(document.getElementById('map')){

        map = new google.maps.Map(document.getElementById('map'), {
            center: {
              //lat: parseFloat(vm.detail.location.latitud), lng: parseFloat(vm.detail.location.longitud)
              lat: -12.049983, lng: -77.042940
            },
            zoom: 17
        });
      }

    };

    function searchUrgency(){
      UrgencyFactory.searchUrgency(vm.search).then(function(response) {
              console.log(response);
              vm.listUrgencies = response;
              //$state.go('urgency');
          });
    }
  };
})();
