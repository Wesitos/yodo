(function() {
    'use strict';
	angular
		.module('urgencyadmin')
		.controller('UrgencyAdminCtrl', UrgencyAdminCtrl);

	UrgencyAdminCtrl.$inject = ['UrgencyAdminFactory', '$state'];

	function UrgencyAdminCtrl(UrgencyAdminFactory, $state) {
		
		var vm = this;
		vm.urgency = {
			tipo: 'O-',
			quantity: 2,
			dni: '46200966',
			date: new Date(),
			comment: 'Ayudo a niña con cáncer'
		};

		vm.createUrgency = createUrgency;
		vm.listUrgencies = listUrgencies;

		vm.list = [];

		init();	
		
		function init(){
    		vm.listUrgencies();
		}

		function listUrgencies(){
			UrgencyAdminFactory.listUrgencies().then(function(response) {
            	console.log(response);
            	vm.list = response;
	        });
		}

		function createUrgency(form){
			console.log(vm.urgency.date.getDate());
			if( form.$valid ){
				UrgencyAdminFactory.createUrgency(vm.urgency).then(function(response) {
	            	console.log(response);            	
	            	//$state.go('urgency');
		        });
			}else{
				console.log('no validate form')
			}
		}
	};
})();