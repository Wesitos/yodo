import {Router} from 'express';
import crypto from 'crypto';
import {verifyAddress} from '../utils/smtp.js';
import donatorModel from '../models/donator.js';
import sanitize from 'mongo-sanitize';

const router = Router();

router.get('/bydni/:dni', function(req, res){
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
                    medinfo: {
                        bloodType: dat.medinfo.bloodType,
                        validDonator: dat.medinfo.validDonator,
                        verified: dat.medinfo.verified
                    }
                }
            };
        }
        res.status(200).jsonp(ret);
        return 1;
    });
});

router.get('/byemail/:email', function(req, res){
    donatorModel.findOne({email: req.params.email}, function(err, dat){
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
                    medinfo: {
                        bloodType: dat.medinfo.bloodType,
                        validDonator: dat.medinfo.validDonator,
                        verified: dat.medinfo.verified
                    }
                }
            };
        }
        res.status(200).jsonp(ret);
        return 1;
    });
});
router.post('/', function(req, res){
    crypto.randomBytes(48, function(err, buffer){
        if (err) return res.status(500).send('Internal error');
        var donator = new donatorModel({
            info: req.body.info,
            contact: {
                email: {
                    value: req.body.data.contact.email.value,
                    verified: false,
                    code: buffer.toString('hex')
                },
                telephone: {
                    value: req.body.data.contact.telephone.value,
                    verified: false,
                    code: null
                }
            },
            medinfo: {
                bloodType: null,
                validDonator: null,
                verified: false
            }
        });
      donator.save(function(err2, dat){
          if(err2) return res.status(500).send('Internal error');
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
                    }
                }
            };
            verifyAddress(ret.data);
            res.status(200).jsonp(ret);
            return 1;
      });
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
                return {
                    success: true,
                    data:{
                        id: dat._id,
                        dni: dat.dni,
                        info: dat.info
                    }
                };
            });
        }
        return 1;
    });
});
router.put('/medinfo/:id', function(req, res){
    donatorModel.findById(req.params.id, function(err, dat){
        if (err) return res.status(500).send('Internal error');
        if(dat===null){
            if (err) return res.status(404).send('Not found');
        }else{
            dat.medinfo = req.body.data.medinfo;
            dat.save(function(err, dat){
                if (err) return res.status(500).send('Internal error');
                var ret = {
                    success: true,
                    data: {
                        id: dat._id,
                        dni: dat.dni,
                        info: dat.info,
                        medinfo: dat.info
                    }
                };
                return res.status(200).jsonp(ret);
            });
        }
        return 1;
    });
});

router.get('/vermail/:id/:code', function(req, res){
    donatorModel.findById(req.params.id, function(err, dat){
        if (err) return res.status(500).send('Internal error');
        if(dat===null){
            if (err) return res.status(404).send('Not found');
        }else{
            if(dat.contact.email.code != req.params.code){
                return {
                    success: false,
                    data: null
                };
            }else{
                dat.contact.telephone.verified = true;
                dat.contact.telephone.code = null;
                dat.save(function(err, dat){
                    if (err) return res.status(500).send('Internal error');
                    return res.status(200).send({
                        success: true,
                        data: {
                            id: dat._id,
                            dni: dat.dni,
                            info: dat.info
                        }
                    });
                });
            }
        }
        return 1;
    });
});

router.post('/vertel', function(req, res){
    donatorModel.findById(req.user.id, function(err, dat){
        if (err) return res.status(500).send('Internal error');
        if(dat===null){
            if (err) return res.status(404).send('Not found');
        }else{
            if(dat.contact.email.code != req.body.data.code){
                return {
                    success: false,
                    data: null
                };
            }else{
                dat.contact.telephone.verified = true;
                dat.contact.telephone.code = null;
                dat.save(function(err, dat){
                    if (err) return res.status(500).send('Internal error');
                    return res.status(200).send({
                        success: true,
                        data: {
                            id: dat._id,
                            dni: dat.dni,
                            info: dat.info
                        }
                    });
                });
            }
        }
        return 1;
    });
});
export default router;
