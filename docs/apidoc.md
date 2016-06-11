```GET /api/donators/dni/:dni```
```GET /api/donators/email/:email```
```json
{
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
```
```POST /api/donators/add```
```json
{
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
```
```PUT /api/donators/update/:id```
```json
{
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
```
```GET /api/urgencias/bank/:id```
```json
[{
  "bloodType": "AB+",
  "quantity": 5,
  "bloodBank": "adbhjhfye3743ji3gd",
  "user": "abajbjas93rk3j3fdd",
  "deadLine": "2016-06-06",
  "left": 4,
  "active": true 
}]
```
```POST /api/urgencias/add```
```json
[{
  "bloodType": "AB+",
  "quantity": 5,
  "bloodBank": "adbhjhfye3743ji3gd",
  "user": "abajbjas93rk3j3fdd",
  "deadLine": "2016-06-06",
  "history":[] 
}]
```
```POST /api/urgencias/donate```
```json
{
  "idBank": "f9843dknfdfdfdf",
  "idDonator": "lkfj933km34e3e3",
  "quantity": 6,
  "idUser": "8728jdw982323e2"
}
```