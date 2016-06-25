(function() {
    'use strict';
  angular
    .module('urgency')
    .factory('UrgencyFactory', UrgencyFactory);

  UrgencyFactory.$inject = ['$http', '$q'];

  function UrgencyFactory($http, $q) {
    var service = {
      searchUrgency: searchUrgency
    };

    return service;

    function _searchUrgency(urgency){
      console.log(urgency);
        return $http({
        method: 'GET',
        url: '/api/urgency',
        responseType: "json"
      });
    }

    function searchUrgency(urgency){
      console.log(urgency);
      var urgencies = [];

      var defered = $q.defer();
          var promise = defered.promise;
          try {
            urgencies = [
              {
              name:"Instituto Nacional Materno Perinatal",
              geo:[-12.0526683,-77.0219048],
              unit: 3,
              type: 'O-',
              schedule:"Lunes a domingo de 8:00 am  a 6:00 pm",
              image: "http://www.igss.gob.pe/portal/images/NP_1013MATERNO.jpg",
              contact: "328-1370",
              state: false
          },
          {
              name:"Hospital Nacional Docente Madre Niño \"San Bartolomé\"",
              geo:[-12.0497477,-77.0768937],
              unit: 4,
              type: 'A+',
              schedule:"Lunes a sábado de 8:30 am a 1:30 pm y de 2:30 pm a 5:30 pm",
              image: "http://cde.peru.com/ima/0/1/3/7/1/1371307/611x458/facebook.jpg",
              contact: "201-0400",
              state: false
          },
          {
              name:"Hospital Nacional Dos de Mayo",
              geo:[-12.0558716,-77.0506925],
              unit: 7,
              type: 'O-',
              schedule:"Lunes a sábado de 8:30 am a 1:30 pm y de 2:30 pm a 5:30 pm",
              image: "http://diariomedico.pe/wp-content/uploads/2013/01/Hospital-2-de-mayo.jpg",
              contact: "328-0028",
              state: false
          },
          {
              name:"Instituto Nacional de Salud del Niño de Breña",
              geo:[-12.0749885,-77.0541293],
              unit: 5,
              type: 'A-',
              schedule:"Lunes a sábado de 8:30 am a 1:30 pm y de 2:30 pm a 5:30 pm",
              image: "http://diariomedico.pe/wp-content/uploads/2013/01/Hospital-2-de-mayo.jpg",
              contact: "330-2632",
              state: false
            },
            {
              name:"Hospital Nacional Arzobispo Loayza",
              geo:[-12.049729,-77.0779383],
              unit: 5,
              type: 'AB-',
              schedule:"Lunes a sábado de 7:00 am a 7:00 pm",
              image: "http://www.hospitalloayza.gob.pe/files/NP0000000564_59873ac19b37a66HNAL.jpg",
              contact: "614-4646",
              state: false
            },
            {
              name:"Instituto Nacional de Enfermedades Neoplásicas",
              geo:[-12.1122048,-77.0333886],
              unit: 5,
              type: 'A-',
              schedule:"Lunes a domingo de 8:00 am a 7:00 pm",
              image: "http://www.minsa.gob.pe/dgiem/imagenes/galeria-infraestructura/insts/images/Instituto%20Nacional%20de%20Enfermedades%20Neopl%E1sicas.jpg",
              contact: "201-6500",
              state: false
            },

            {
              name:"Hospital Santa Rosa",
              geo:[-12.0723255,-77.0959632],
              unit: 5,
              type: 'A-',
              schedule:"Lunes a domingo de 8:00 am a 7:00 pm",
              image: "http://www.minsa.gob.pe/portada/prensa/Notasprensa/fotonotasdeprensa/1250-13/PORTADA_SANTA_ROSA.jpg",
              contact: "615-8200",
              state: false
            },

            {
              name:"Hospital Nacional Hipólito Unanue",
              geo:[-12.0409513,-77.0274071],
              unit: 5,
              type: 'AB-',
              schedule:"Lunes a sábado de 7:00 am a 10:30 am  y de 1:00 pm a 3:00 pm",
              image: "http://ual.edu.pe/wp-content/uploads/2013/12/hipolito_unanue.jpg",
              contact: "3627777 anexo 2136",
              state: false
            },
        ];


        for (var i = 0; i < urgencies.length; i++) {
          if (  urgencies[i].type == urgency.type){
            urgencies[i].state = true;
          }
        };

        console.log(urgencies);

          defered.resolve(urgencies);
      }
      catch(err) {
          defered.reject(err);
      }

        return promise;
    }
  };

})();
