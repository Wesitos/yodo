import {Router} from 'express';
import bcrypt from 'bcrypt';
import donatorModel from '../models/donator.js';
import sanitize from 'mongo-sanitize';
import jwt from 'jsonwebtoken';

const router = Router();

router.post('login', function(req, res){
  const email = sanitize(req.params.email),
        password = sanitize(res.params.password);

  donatorModel.findOne({"contact.email.value": email},
                       {"contact.email.value": 1,
                        "contact.email.verified": 1,
                        "dni": 1,
                        password: 1,
                       })
    .then(function(err, dat){
      bcrypt.compare(password, dat.password, function(err, same){
        const email = dat.contact.email.value;
        if (same){
          res.cookie(({
            userId: dat._id,
            bankId: null,
          }))
        }
        else{
          // some error
        }
      })
    });
});
