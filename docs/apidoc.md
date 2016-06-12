```
GET /api/donators/bydni/:dni
```
```
GET /api/donators/byemail/:email
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
POST /api/donators
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
```PUT /api/donators/:id```
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
```GET /api/urgencias/bybank/:id```
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
```POST /api/urgencias```
```json
{
data: [
{
  "bloodType": "AB+",
  "quantity": 5,
  "bloodBank": "adbhjhfye3743ji3gd",
  "user": "abajbjas93rk3j3fdd",
  "deadLine": "2016-06-06",
  "history":[] 
}
]
}
```
```POST /api/urgencias/donate```
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
```GET /api/banks/bylocbtype/:lat/:long/:btype```
```json
{
success: true,
data: [
{
  "idBank": "03j2d823jdsd",
  "quantity": 15
}
]
}
```
```GET /api/banks/:idBank```
```json
{
success: true,
data: {
  "idBank":"80e37ehj3e3d",
  "geo": {
    "lat":-8.182812,
    "lon":-78.288323
  },
  "quantity":15
}
}
```
