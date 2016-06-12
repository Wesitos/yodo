import {Router} from 'express';
import bcrypt from 'bcrypt';
import donatorModel from '../models/donator.js';
import sanitize from 'mongo-sanitize';
import {signJWT} from '../auth.js';
import Promise from 'bluebird';

const router = new Router();

const compare = Promise.promisify(bcrypt.compare);

router.post('/', function(req, res){
  const email = sanitize(req.body.data.email),
        password = sanitize(req.body.data.password);
  donatorModel.findOne({"contact.email.value": email},
                       {"contact.email.verified": 1,
                        password: 1,
                       })
    .then(function(dat){
      if (dat !== null){
        return compare(password, dat.password)
          .then(function(same){
            if (same){
              // set cookie
              let token = signJWT({
                userId: dat,
                bankId: null,
              });
              res.cookie('token', token, {httpOnly: true});
              res.json({
                success: true,
              });
            }
            else{
              // some error
              res.json({
                success: false,
              });
            }
          });
      }
      else{
        res.json({
          success: false,
        });
      }
    });
});

export default router;
