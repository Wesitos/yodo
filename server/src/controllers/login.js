import {Router} from 'express';
import bcrypt from 'bcrypt';
import donatorModel from '../models/donator.js';
import sanitize from 'mongo-sanitize';
import {signJWT} from '../auth.js';

const router = new Router();

router.post('/', function(req, res){
  const email = sanitize(req.params.email),
        password = sanitize(res.params.password);

  donatorModel.findOne({"contact.email.value": email},
                       {"contact.email.verified": 1,
                        password: 1,
                       })
    .then(function(err, dat){
      if (dat !== null){
        bcrypt.compare(password, dat.password, function(err2, same){
          if (same){
            // set cookie
            let token = signJWT({
              userId: dat._id,
              bankId: null,
            });
            res.cookie('token',token, {httpOnly: true});
            res.json({
              success: true,
              error: null,
            });
          }
          else{
            // some error
            res.json({
              success: false,
              error: err2,
            });
          }
        });
      }
      else{
        res.json({
          success: false,
          error: err,
        });
      }
    });
});
