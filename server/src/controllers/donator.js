import {Router} from 'express';
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import {verifyAddress} from '../utils/smtp.js';
import donatorModel from '../models/donator.js';
import sanitize from 'mongo-sanitize';
import Promise from 'bluebird';
import {logger} from '../logger.js';

const genSalt = Promise.promisify(bcrypt.genSalt);
const hash = Promise.promisify(bcrypt.hash);

const randomBytes = Promise.promisify(crypto.randomBytes);

const router = Router();

router.get('/bydni/:dni', function(req, res){
    //TODO: Sanitizar
    donatorModel.findOne({dni: req.params.dni}, function(err, dat){
        if(err) return res.status(500).send('Internal Server Error');
        if (dat===null){
            res.send({success: false, data: null});
        }else{
            var ret = {
                success: true,
                data: {
                    id: dat._id,
                    dni: dat.dni,
                    info: dat.info,
                    contact: {
                        email: {
                            value: dat.contact.email.value,
                            verified: dat.contact.email.verified
                        },
                        telephone: {
                            value: dat.contact.telephone.value,
                            verified: dat.contact.telephone.verified
                        }
                    },
                    medinfo: (dat.medinfo || null) && {
                        bloodType: dat.medinfo.bloodType || null,
                        validDonator: dat.medinfo.validDonator || null,
                        verified: dat.medinfo.verified || null
                    }
                }
            };
        }
        res.status(200).jsonp(ret);
        return 1;
    });
});

router.get('/byemail/:email', function(req, res){
    //TODO: Sanitizar
    donatorModel.findOne({"contact.email.value": req.params.email}, function(err, dat){ 
        if(err) return res.status(500).send('Internal Server Error');
        if (dat==null){
            res.send({success: false, data: null});
        }else{
            var ret = {
                success: true,
                data: {
                    id: dat._id,
                    dni: dat.dni,
                    info: dat.info,
                    contact: {
                        email: {
                            value: dat.contact.email.value,
                            verified: dat.contact.email.verified
                        },
                        telephone: {
                            value: dat.contact.telephone.value,
                            verified: dat.contact.telephone.verified
                        }
                    },
                    medinfo: (dat.medinfo || null) && {
                        bloodType: dat.medinfo.bloodType || null,
                        validDonator: dat.medinfo.validDonator || null,
                        verified: dat.medinfo.verified || null
                    }
                }
            };
        }
        res.status(200).jsonp(ret);
        return 1;
    });
});
router.post('/', function(req, res){
  var codeBuff;
  randomBytes(24)
  .then(function(buffer){
    codeBuff = buffer;
    return genSalt();
  })
  .then(function(salt){
    return hash(req.body.data.password ||'', salt);
  })
  .then(function(hashed){
        //if (err) return res.status(500).send('Internal error 1');
    var donator = new donatorModel({
      info: req.body.data.info,
      password: hashed,
      contact: {
        email: {
          value: req.body.data.contact.email.value,
          verified: false,
          code: codeBuff.toString('hex')
        },
        telephone: {
          value: req.body.data.contact.telephone.value,
          verified: false,
          code: null
        }
      },
      medinfo: {
        bloodType: req.body.data.medinfo.bloodType,
        validDonator: null,
        verified: false
      }
    });
    return donator.save();
  }).then(function(dat){
    //if(err) return res.status(500).send('Internal error 2');
    var ret = {
      success: true,
      data: {
        id: dat._id,
        info: dat.info,
        contact: {
          email: {
            value: dat.contact.email.value,
            verified: false
          },
          telephone: {
            value: dat.contact.telephone.value,
            verified: false
          }
        },
        medinfo: {
          bloodType: dat.medinfo.bloodType
        }
      }
    };
    verifyAddress(dat);
    res.status(200).jsonp(ret);
    return 1;
  });
});
router.put('/info/:id', function(req, res){
    donatorModel.findById(req.params.id, function(err, dat){
        if (err) return res.status(500).send('Internal error');
        if(dat===null){
            if (err) return res.status(404).send('Not found');
        }else{
            dat.dni = req.body.data.dni;
            dat.info = req.body.data.info;
            dat.save(function(err, dat){
                if (err) return res.status(500).send('Internal error');
                return res.status(200).jsonp({
                    success: true,
                    data: {
                        id: dat._id,
                        dni: dat.dni,
                        info: dat.info
                    }
                });
            });
        }
        return 1;
    });
});
router.put('/vmedinfo/:id', function(req, res){
    donatorModel.findById(req.params.id, function(err, dat){
        if (err) return res.status(500).send('Internal error');
        if(dat===null){
            if (err) return res.status(404).send('Not found');
        }else{
            dat.medinfo = {
                bloodType: req.body.data.medinfo.bloodType,
                validDonator: req.body.data.medinfo.validDonator,
                verified: true
            };
            dat.save(function(err, dat){
                if (err) return res.status(500).send('Internal error');
                var ret = {
                    success: true,
                    data: {
                        id: dat._id,
                        dni: dat.dni,
                        medinfo: dat.medinfo
                    }
                };
                return res.status(200).jsonp(ret);
            });
        }
        return 1;
    });
});

router.post('/vertel', function(req, res){
  donatorModel.findById(req.user.id)
    .then(function(dat){
      if(dat.contact.email.code != req.body.data.code){
        return null;
      }
      else{
        dat.contact.telephone.verified = true;
        dat.contact.telephone.code = null;
        return dat.save();
      }
    }).error(function(){
      return res.status(500).send('Internal error');
    })
    .then(function(dat){
      return res.status(200).send({
        success: dat && true,
        data: dat && {
          id: dat._id,
          dni: dat.dni,
          info: dat.info,
        }
      });
    })
    .error(function(){
      res.status(500).send('Internal error');
    });
});

router.get('/validate', async function(req, res){
  const {user: _id, code} = req.query;
  var donator;
  try{
    donator = await donatorModel.findById(_id);
  }
  catch(e){
    logger.error(e);
    res.status(500).json({
      sucess: false,
    });
    return;
  }
  if (donator !== null &&
      donator.contact.email.code === code){
    // Verifica el correo
    donator.contact.email.verified = true;
    // Elimina el codigo de verificacion
    donator.contact.email.code = undefined;
    try{
      await donator.save();
    }
    catch(e){
      logger.error(e);
      res.status(500).json({
        success: false,
      });
      return;
    }
    res.status(200).json({
      sucess: true,
    });
  }
  else{
    res.status(404).json({
      sucess: false,
    });
  }
});

export default router;
