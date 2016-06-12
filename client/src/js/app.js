//var myApp = angular.module('yodonanteApp', ['ngMaterial', 'ui.router', 'md.data.table', 'donator', 'urgency', 'login', 'urgencyadmin', 'donation']);
var angular = require('angular');
var myApp = angular.module('yodonanteApp', ['ngMaterial', 'ui.router', 'md.data.table']);

require('./src/js/donator');
require('./src/js/login');
require('./src/js/urgencyadmin');
require('./src/js/donation');

myApp.config(function($stateProvider, $urlRouterProvider, $mdThemingProvider) {

	$mdThemingProvider.theme('default')
	    .primaryPalette('red')
	    .accentPalette('orange');
  
  	$urlRouterProvider.otherwise("/home");
	  
  	$stateProvider
	  	.state('home', {
	      url: "/home",		      
	      views: {
	      	'viewcontent':{
	      		templateUrl: "./src/templates/home.html"
	      	},
	      	'viewheader':{
	      		templateUrl: "./src/templates/header.html"
	      	}
	      }
	    })
	    .state('donator', {
	      url: "/donator",
	      views: {
	      	'viewcontent':{
	      		templateUrl: "./src/templates/donator.html",
	      		controller: 'DonatorCtrl',
	      		controllerAs: 'vm'
	      	},
	      	'viewheader':{
	      		templateUrl: "./src/templates/header.html"
	      	}
	      }
	    })

	    .state('urgency', {
	      url: "/urgency",
	      views: {
	      	'viewcontent':{
	      		templateUrl: "./src/templates/urgency.html",
	      		controller: 'UrgencyCtrl',
	      		controllerAs: 'vm'
	      	},
	      	'viewheader':{
	      		templateUrl: "./src/templates/header.html"
	      	}
	      }
	    })

	    .state('login', {
	      url: "/admin/login",
	      views: {
	      	'viewcontent':{
	      		templateUrl: "./src/templates/admin/login.html",
	      		controller: 'LoginCtrl',
	      		controllerAs: 'vm'
	      	},
	      	'viewheader':{
	      		templateUrl: "./src/templates/header.html"
	      	}
	      }
	    })

	    .state('urgencyadmin', {
	      url: "/admin/urgency",
	      views: {
	      	'viewcontent':{
	      		templateUrl: "./src/templates/admin/urgency.html",
	      		controller: 'UrgencyAdminCtrl',
	      		controllerAs: 'vm'
	      	},
	      	'viewheader':{
	      		templateUrl: "./src/templates/admin/header.html"
	      	}
	      }
	    })

	    .state('donation', {
	      url: "/admin/donation",
	      views: {
	      	'viewcontent':{
	      		templateUrl: "./src/templates/admin/donation.html",
	      		controller: 'DonationCtrl',
	      		controllerAs: 'vm'
	      	},
	      	'viewheader':{
	      		templateUrl: "./src/templates/admin/header.html"
	      	}
	      }
	    });
	});
