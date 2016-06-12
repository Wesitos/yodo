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
			tipo: '',
			location: 'lima'
		};

		vm.searchUrgency = searchUrgency;
		vm.listUrgencies = [];

		init();	
		
		function init(){			
	        console.log('sdf');
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
    
		};

		function searchUrgency(){
			console.log('sdfadsf');
			UrgencyFactory.searchUrgency(vm.search).then(function(response) {
            	console.log(response);
            	vm.listUrgencies = response;
            	//$state.go('urgency');
	        });
		}
	};
})();