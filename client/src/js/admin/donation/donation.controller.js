(function() {
    'use strict';
  angular
    .module('donation')
    .controller('DonationCtrl', DonationCtrl);

  DonationCtrl.$inject = ['DonationFactory', '$state'];

  function DonationCtrl(DonationFactory, $state) {

    var vm = this;
    vm.donation = {
      dni_donante: 46200966,
      quantity: 2,
      dni_paciente: 46293939,
      date: new Date()
    };

    vm.createDonation = createDonation;
    vm.listDonations = listDonations;
    vm.list = [];

    init();

    function init(){
        vm.listDonations();
    }

    function listDonations(){
      DonationFactory.listDonations().then(function(response) {
              console.log(response);
              vm.list = response;
          });
    }

    function createDonation(form){
      console.log(vm.donation.date.getDate());
      if( form.$valid ){
        DonationFactory.createDonation(vm.donation).then(function(response) {
                console.log(response);
                //$state.go('donation');
            });
      }else{
        console.log('no validate form')
      }
    }
  };
})();
