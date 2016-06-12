import express from 'express';
import mongoose from 'mongoose';
import crypto from 'bcrypt';
import {verifyAddress} from '../utils/smtp.js';
import donatorModel from '../models/donator.js';
var router = express.Router();

router.get('/bydni/:dni',function(req, res){
    donatorModel.findOne({dni: req.params.dni}, function(err, dat){
        if(err) return res.send(500,'Internal Server Error');
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
        if(err) return res.send(500,'Internal Server Error');
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
        if (err) return res.send(500, 'Internal error');
        var donator = new donatorModel({
            info: req.body.info,
            contact: {
                email: {
                    value: req.body.contact.email.value,
                    verified: false,
                    code: buffer.toString('hex')
                },
                telephone: {
                    value: req.body.contact.telephone.value,
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
        donator.save(function(err, dat){
            if(err) return res.send(500, 'Internal error');
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
router.put('/:id', function(req, res){
    donatorModel.findById(req.params.id, function(err, dat){
        if (err) return res.send(500,'Internal error');
        if(dat===null){
            if (err) return res.send(404,'Not found');
        }else{
            dat.dni = req.body.data.dni;
            dat.info = req.body.data.info;

        }
        return 1;
    });
});

export default router;
