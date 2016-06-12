```
GET /api/donator/bydni/:dni
```
```
GET /api/donator/byemail/:email
```
```json
{
success: true,
data: {
  "id": "dj54ue3dwnjk",
  "dni": "92740273",
  "info": {
    "names": "John Ney",
    "lastNames": "Smith",
    "gender": "M",
    "ubigeo": "150102",
    "birth": "1985-06-03"
  },
  "contact": {
    "email": {
      "value": "jneysmith@gmail.com",
      "verified": true
    },
    "telephone": {
      "verified": true,
      "value": "2804656"
    }
  },
  "medinfo": {
    "bloodType": "AB+",
    "validDonator": true,
    "verified": true
  }
}
}
```

```
POST /api/donator
```
Request
```json
{
  success: true,
  data: {
    "info": {
      "names": "John Ney",
      "lastNames": "Smith",
      "gender": "M",
      "ubigeo": "150102",
      "birth": "1985-06-03"
    },
    "contact": {
      "email": {
        "value": "jneysmith@gmail.com",
      },
      "telephone": {
        "value": "2804656"
      }
    }
  }
}
```
Response
```json
{
  "success": true,
  "data": {
    "id": "hfjh342e2332d",
    "info": {
      "names": "John Ney",
      "lastNames": "Smith",
      "gender": "M",
      "ubigeo": "150102",
      "birth": "1985-06-03"
    },
    "contact": {
      "email": {
        "value": "jneysmith@gmail.com",
      },
      "telephone": {
        "value": "2804656"
      }
    }
  }
}
```
```
```PUT /api/donator/info/:id```
```json
{
success: true,
data: {
  "dni": "92740273",
  "info": {
    "names": "John Ney",
    "lastNames": "Smith",
    "gender": "M",
    "ubigeo": "150102",
    "birth": "1985-06-03"
  },
  "contact": {
    "email": {
      "value": "jneysmith@gmail.com",
      "verified": true
    },
    "telephone": {
      "verified": true,
      "value": "2804656"
    }
  },
  "medinfo": {
    "bloodType": "AB+",
    "validDonator": true,
    "verified": true
  }
}
}
```
```PUT /api/donator/medinfo/:id```
```json
{
success: true,
data: {
  "dni": "92740273",
  "info": {
    "names": "John Ney",
    "lastNames": "Smith",
    "gender": "M",
    "ubigeo": "150102",
    "birth": "1985-06-03"
  },
  "contact": {
    "email": {
      "value": "jneysmith@gmail.com",
      "verified": true
    },
    "telephone": {
      "verified": true,
      "value": "2804656"
    }
  },
  "medinfo": {
    "bloodType": "AB+",
    "validDonator": true,
    "verified": true
  }
}
}
```
```PUT /api/donator/vermail/:id/:code```
```json
{
success: true,
data: {
  "dni": "92740273",
  "info": {
    "names": "John Ney",
    "lastNames": "Smith",
    "gender": "M",
    "ubigeo": "150102",
    "birth": "1985-06-03"
  },
  "contact": {
    "email": {
      "verified": true,
      "value": "jnesmith@gmail.com"
    }
  }
}
}
```
```PUT /api/donator/vertel```
```json
{
  data: {
    code: "hf3u493jkr3j33434d3"
  }
}
```
Response
```json
{
success: true,
data: {
  "dni": "92740273",
  "info": {
    "names": "John Ney",
    "lastNames": "Smith",
    "gender": "M",
    "ubigeo": "150102",
    "birth": "1985-06-03"
  },
  "contact": {
    "telephone": {
      "verified": true,
      "value": "2804656"
    }
  }
}
}
```
```GET /api/receptor/bybank/:id```
```json
{
success: true,
data: [{
  "bloodType": "AB+",
  "quantity": 5,
  "bloodBank": "adbhjhfye3743ji3gd",
  "user": "abajbjas93rk3j3fdd",
  "deadLine": "2016-06-06",
  "left": 4,
  "active": true 
}]
}
```
```POST /api/receptor```
Request
```json
{
data: {
  "bloodType": "AB+",
  "quantity": 5,
  "bloodBank": "adbhjhfye3743ji3gd",
  "deadLine": "2016-06-06"
}
}
```
Response
```json
{
success: true,
data: {
  "id": "jhr38rk3r384434f",
  "bloodType": "AB+",
  "quantity": 5,
  "bloodBank": "adbhjhfye3743ji3gd",
  "deadLine": "2016-06-06"
  "history":[],
  "left": 5,
  "active": true
}
}
```
```POST /api/business/donate```
```json
{
data: {
  "idBank": "f9843dknfdfdfdf",
  "idDonator": "lkfj933km34e3e3",
  "quantity": 6,
  "idUser": "8728jdw982323e2"
}
}
```
```GET /api/bank/:lat/:long/:btype```
```json
{
success: true,
data: [
{
  "idBank": "03j2d823jdsd",
  "name": "Bad Blood",
  "quantity": 15
}
]
}
```
```GET /api/bank/:idBank```
```json
{
success: true,
data: {
  "idBank":"80e37ehj3e3d",
  "name": "Bad Blood",
  "geo": {
    "lat":-8.182812,
    "lon":-78.288323
  },
  "quantity":15
}
}
```
