(function() {
    'use strict';
	angular
		.module('login')
		.controller('LoginCtrl', LoginCtrl);

	LoginCtrl.$inject = ['LoginFactory', '$state'];

	function LoginCtrl(LoginFactory, $state) {
		
		var vm = this;
		vm.loginUser = loginUser;
		vm.login = { 			
			username: '',
			password: ''
		};

		init();	
		
		function init(){
    
		};

		function loginUser(form){	
			if(form.$valid){
				LoginFactory.login(vm.login).then(function(response) {
	            	console.log(response);
	            	$state.go('urgencyadmin');
		        });	
			}else{
				console.log('no form validate');
			}
		}
	};
})();