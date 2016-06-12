(function() {
    'use strict';
	angular
		.module('querydonator')
		.controller('QueryDonatorCtrl', QueryDonatorCtrl);

	QueryDonatorCtrl.$inject = ['QueryDonatorFactory', '$state'];

	function QueryDonatorCtrl(QueryDonatorFactory, $state) {		
		var vm = this;
		vm.query = {
			type: 'email', //email | dni
			query: 'salvador2489@gmail.com'
		};

		vm.donator = { 
			firstname: 'Salvador',
			lastname: 'Coronel Flores',
			telephone: 940371198,
			email: 'Salvador2489@gmail.com',
			tipo: 'O-'
		};

		vm.queryDonator = queryDonator;

		init();	
		
		function init(){
			
		}

		function queryDonator(form){
			if( form.$valid ){
				QueryDonatorFactory.queryDonator(vm.query).then(function(response) {
	            	console.log(response);            	
	            	//$state.go('donation');
		        });
			}else{
				console.log('no validate form')
			}
		}
	};
})();