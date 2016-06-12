var angular = require('angular');

window.angular = angular;

var myApp = angular.module('yodonanteApp', [require('angular-ui-router'), require('angular-material'), require('angular-material-data-table'), 'donator', 'urgency', 'login', 'urgencyadmin', 'donation', 'querydonator']);

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
	    })

	    .state('querydonator', {
	      url: "/admin/querydonator",
	      views: {
	      	'viewcontent':{
	      		templateUrl: "./src/templates/admin/querydonator.html",
	      		controller: 'QueryDonatorCtrl',
	      		controllerAs: 'vm'
	      	},
	      	'viewheader':{
	      		templateUrl: "./src/templates/admin/header.html"
	      	}
	      }
	    })

	    .state('urgencydetail', {
	      url: "/urgency/detail",
	      views: {
	      	'viewcontent':{
	      		templateUrl: "./src/templates/urgencydetail.html",
	      		controller: 'UrgencyCtrl',
	      		controllerAs: 'vm'
	      	},
	      	'viewheader':{
	      		templateUrl: "./src/templates/admin/header.html"
	      	}
	      }
	    });
	});

require('./donator');
require('./urgency');
require('./login');
require('./admin/donation');
require('./admin/querydonator');
require('./admin/urgency');